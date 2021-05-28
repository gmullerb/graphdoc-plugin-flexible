//  Copyright (c) 2021 Gonzalo Müller Bravo.
//  Licensed under the MIT License (MIT), see LICENSE.txt
const { Plugin } = require('@2fd/graphdoc/lib/utility')

const PLUGINS = [
  [ 'navigation.schema', require('@2fd/graphdoc/plugins/navigation.schema').default ],
  [ 'navigation.scalar', require('@2fd/graphdoc/plugins/navigation.scalar').default ],
  [ 'navigation.enum', require('@2fd/graphdoc/plugins/navigation.enum').default ],
  [ 'navigation.interface', require('@2fd/graphdoc/plugins/navigation.interface').default ],
  [ 'navigation.union', require('@2fd/graphdoc/plugins/navigation.union').default ],
  [ 'navigation.object', require('@2fd/graphdoc/plugins/navigation.object').default ],
  [ 'navigation.input', require('@2fd/graphdoc/plugins/navigation.input').default ],
  [ 'navigation.directive', require('@2fd/graphdoc/plugins/navigation.directive').default ],
  [ 'document.schema', require('@2fd/graphdoc/plugins/document.schema').default ],
  [ 'document.require', require('@2fd/graphdoc/plugins/document.require-by').default ]
]

function activeOption(option) {
  return option === true || option === undefined
}

function parseOptions(options, ...pluginArgs) {
  const navigations = []
  const documents = []
  const assets = []
  for(let pluginTuple of PLUGINS) {
    const pluginOptions = options[pluginTuple[0]]
    if (pluginOptions) {
      if (pluginOptions.disable !== true) {
        const activeNavigations = activeOption(pluginOptions.navigations)
        const activeDocuments = activeOption(pluginOptions.documents)
        const activeAssets = activeOption(pluginOptions.assets)
        if(activeNavigations || activeDocuments || activeAssets) {
          const plugin = new pluginTuple[1](...pluginArgs)
          if(activeNavigations) {
            navigations.push(plugin)
          }
          if(activeDocuments) {
            documents.push(plugin)
          }
          if(activeAssets) {
            assets.push(plugin)
          }
        }
      }
    }
    else {
      const plugin = new pluginTuple[1](...pluginArgs)
      navigations.push(plugin)
      documents.push(plugin)
      assets.push(plugin)
    }
  }
  return {
    navigations,
    documents,
    assets
  }
}

class GraphdocPluginFlexible {
  constructor(schema, projectPackage, graphdocPackage) {
    this.plugins = parseOptions(projectPackage['graphdoc-plugin-flexible'] || {}, schema, projectPackage, graphdocPackage)
  }
  getNavigations(buildForType) {
    return Plugin.collectNavigations(this.plugins.navigations, buildForType)
  }
  getDocuments(buildForType) {
    return Plugin.collectDocuments(this.plugins.documents, buildForType)
  }
  getHeaders(buildForType) {
    return Plugin.collectHeaders(this.plugins.assets, buildForType)
  }
  getAssets() {
    return Plugin.collectAssets(this.plugins.assets)
  }
}

module.exports.default = GraphdocPluginFlexible
