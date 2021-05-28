//  Copyright (c) 2021 Gonzalo Müller Bravo.
//  Licensed under the MIT License (MIT), see LICENSE.txt
const GraphdocPluginFlexible = require('../lib/index')
const GraphdocPluginNavigationSchema = require('@2fd/graphdoc/plugins/navigation.schema')

class MockNavigationSchema {}

jest.mock('@2fd/graphdoc/plugins/navigation.schema', () => ({
  __esModule: true,
  default:  jest.fn().mockImplementation(() => MockNavigationSchema)
}))
jest.mock('@2fd/graphdoc/plugins/navigation.schema')
jest.mock('@2fd/graphdoc/plugins/navigation.scalar')
jest.mock('@2fd/graphdoc/plugins/navigation.enum')
jest.mock('@2fd/graphdoc/plugins/navigation.interface')
jest.mock('@2fd/graphdoc/plugins/navigation.union')
jest.mock('@2fd/graphdoc/plugins/navigation.object')
jest.mock('@2fd/graphdoc/plugins/navigation.input')
jest.mock('@2fd/graphdoc/plugins/navigation.directive')
jest.mock('@2fd/graphdoc/plugins/document.schema')
jest.mock('@2fd/graphdoc/plugins/document.require-by')

beforeEach(() => {
  GraphdocPluginNavigationSchema.default.mockClear();
});

it('should create plugin without options', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {}, {})

  expect(plugin.plugins.navigations).toHaveLength(10)
  expect(plugin.plugins.documents).toHaveLength(10)
  expect(plugin.plugins.assets).toHaveLength(10)
  expect(plugin.plugins.navigations.find(navigation => navigation === MockNavigationSchema)).toBeDefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(1)
})

it('should create plugin without 1 navigations option', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {
    'graphdoc-plugin-flexible': {
      'navigation.schema': {
        navigations: false
      }
    }
  }, {})

  expect(plugin.plugins.navigations).toHaveLength(9)
  expect(plugin.plugins.documents).toHaveLength(10)
  expect(plugin.plugins.assets).toHaveLength(10)
  expect(plugin.plugins.navigations.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(1)
})

it('should create plugin without 1 documents option', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {
    'graphdoc-plugin-flexible': {
      'navigation.schema': {
        documents: false
      }
    }
  }, {})

  expect(plugin.plugins.navigations).toHaveLength(10)
  expect(plugin.plugins.documents).toHaveLength(9)
  expect(plugin.plugins.assets).toHaveLength(10)
  expect(plugin.plugins.documents.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(1)
})

it('should create plugin without 1 assets option', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {
    'graphdoc-plugin-flexible': {
      'navigation.schema': {
        assets: false
      }
    }
  }, {})

  expect(plugin.plugins.navigations).toHaveLength(10)
  expect(plugin.plugins.documents).toHaveLength(10)
  expect(plugin.plugins.assets).toHaveLength(9)
  expect(plugin.plugins.assets.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(1)
})

it('should create plugin without 1 plugin', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {
    'graphdoc-plugin-flexible': {
      'navigation.schema': {
        navigations: false,
        documents: false,
        assets: false
      }
    }
  }, {})

  expect(plugin.plugins.navigations).toHaveLength(9)
  expect(plugin.plugins.documents).toHaveLength(9)
  expect(plugin.plugins.assets).toHaveLength(9)
  expect(plugin.plugins.navigations.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(plugin.plugins.documents.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(plugin.plugins.assets.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(0)
})

it('should create plugin without 1 plugin through disable option', function() {
  const plugin = new GraphdocPluginFlexible.default({}, {
    'graphdoc-plugin-flexible': {
      'navigation.schema': {
        disable: true
      }
    }
  }, {})

  expect(plugin.plugins.navigations).toHaveLength(9)
  expect(plugin.plugins.documents).toHaveLength(9)
  expect(plugin.plugins.assets).toHaveLength(9)
  expect(plugin.plugins.navigations.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(plugin.plugins.documents.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(plugin.plugins.assets.find(navigation => navigation === MockNavigationSchema)).toBeUndefined()
  expect(GraphdocPluginNavigationSchema.default).toHaveBeenCalledTimes(0)
})
