import { VirtualTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { expect } from 'chai';
import * as path from 'path';
import { FilterOptions } from '../../src/filter/schema';

describe('Filter Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner('.', path.join(process.cwd(), 'src/collection.json'));
  it('should manage name only', () => {
    const options: FilterOptions = {
      name: 'foo'
    };
    const tree: UnitTestTree = runner.runSchematic('filter', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/foo/foo.filter.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name as a path', () => {
    const options: FilterOptions = {
      name: 'bar/foo'
    };
    const tree: UnitTestTree = runner.runSchematic('filter', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/bar/foo/foo.filter.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name and path', () => {
    const options: FilterOptions = {
      name: 'foo',
      path: 'baz'
    };
    const tree: UnitTestTree = runner.runSchematic('filter', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/baz/foo/foo.filter.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage name to dasherize', () => {
    const options: FilterOptions = {
      name: 'fooBar'
    };
    const tree: UnitTestTree = runner.runSchematic('filter', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/foo-bar/foo-bar.filter.ts`
      )
    ).to.not.be.undefined;
  });
  it('should manage path to dasherize', () => {
    const options: FilterOptions = {
      name: 'barBaz/foo'
    };
    const tree: UnitTestTree = runner.runSchematic('filter', options, new VirtualTree());
    const files: string[] = tree.files;
    expect(
      files.find((filename) =>
        filename === `/src/bar-baz/foo/foo.filter.ts`
      )
    ).to.not.be.undefined;
  });
});
