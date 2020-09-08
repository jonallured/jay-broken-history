# jay [![CircleCI][badge]][circleci]

This project is a collection of commands that I find helpful. It's built using
the [oclif][] framework.

## Installation

This is a published NPM package, so you can install with yarn or whatever:

```
$ yarn add @jonallured/jay
# or
$ yarn global add @jonallured/jay
```

I used to just run this locally, like so:

```
$ c jay
$ npm link
$ asdf reshim
```

You don't always have to reshim, but if it doesn't link right, then that's
probably the issue.

## Running checks

This project is setup to comply with the following checks:

* prettier
* eslint
* Typescript
* jest

See the package.json for individual commands, but to run all of this together,
one can do this:

```
$ ./bin/check-all
```

And so if that is green locally there's an excellent chance that CI will be
green too.

## Updating dependencies

There's a script for this so updating to the latest version of dependencies
should be as easy as this:

```
$ ./bin/update
```

This will run `yarn upgrade --latest` and then create a PR after running all the
checks locally. That PR will need to be manually merged.

## Releasing

I've set things up so that CircleCI can release new package versions
automatically based on pushing tags, so one can cut a new version like so:

```
$ ./bin/release 0.0.1 0.0.2
```

That will:

* update the required files with new version numbers
* commit that change and push to master
* tag that commit
* push that tag

Which in turn triggers a build that has access to NPM creds and will publish the
package without running tests because YOLO.

[badge]: https://circleci.com/gh/jonallured/jay.svg?style=svg
[circleci]: https://circleci.com/gh/jonallured/jay
[oclif]: https://oclif.io/
