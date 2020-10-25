# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-beta.12](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2020-10-25)

**Note:** Version bump only for package lesy





# [1.0.0-beta.11](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2020-10-14)


### Bug Fixes

* **lesy-plugin-generator:** windows path escaped in  handlebars ([a3c06aa](https://github.com/lokesh-coder/lesyjs/commit/a3c06aa2350b80afdfc1b11ea747bfb18a9599ce))





# [1.0.0-beta.10](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2020-09-27)


### Bug Fixes

* **compiler:** default props is mutating when workspace is loaded ([e625259](https://github.com/lokesh-coder/lesyjs/commit/e625259874557c796adfe355557202cad47e863d))
* **compiler:** merge user plugins with default plugins ([5849d0f](https://github.com/lokesh-coder/lesyjs/commit/5849d0fa984fd2f5b1202a720bade4da10f09cf7))
* **core:** when command prop value is boolean is ignore in command ([fa79825](https://github.com/lokesh-coder/lesyjs/commit/fa79825f07c3e93f987cb6f804edac7cbc666ad7))
* **lesy-plugin-config:** add missing setter function ([51624dd](https://github.com/lokesh-coder/lesyjs/commit/51624ddd9658061b186be1b1d5f07cb847b8bb76))
* **lesy-plugin-pilot:** isVisible prop typo ([1aef711](https://github.com/lokesh-coder/lesyjs/commit/1aef7118c73bc73712c51d4cdace62f206ac16e3))
* **lesy-plugin-pilot:** lookup for localstate instead of direct prop ([0fabc18](https://github.com/lokesh-coder/lesyjs/commit/0fabc184df3e00d141f6316fe94ce05bfb315705))


### Features

* **lesy-pilot-ui:** support to change console position ([8be7b36](https://github.com/lokesh-coder/lesyjs/commit/8be7b369efcf1174b223ccebc8a81e3f850123ed))


### Performance Improvements

* **compiler:** improve loading performance ([818163e](https://github.com/lokesh-coder/lesyjs/commit/818163e80e7bbcec4705e0b60439743297614847))
* **core:** refactor to improve performance ([830198f](https://github.com/lokesh-coder/lesyjs/commit/830198f0ec2660512f9d1e5031934cf775f90378))
* **lesy:** run with TS in dev mode ([f01ff28](https://github.com/lokesh-coder/lesyjs/commit/f01ff2870c55ec12f2710d0eba13d160e8898231))
* **lesy-benchmark:** update results ([9aaca95](https://github.com/lokesh-coder/lesyjs/commit/9aaca95d2d0d730aa9df1b5c8f04e705c1307933))





# [1.0.0-beta.9](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2020-09-16)


### Bug Fixes

* **lesy-plugin-pilot:** lookup for localState when loading workspace projects ([eb05fc9](https://github.com/lokesh-coder/lesyjs/commit/eb05fc92276f293bc7608ebadc79d8d0f459a94e))





# [1.0.0-beta.8](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2020-09-16)


### Performance Improvements

* improve overall performance ([f263587](https://github.com/lokesh-coder/lesyjs/commit/f2635870954e202ddcfffc252c9dac4387abe3f1))





# [1.0.0-beta.7](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2020-08-24)


### Bug Fixes

* **pilot-ui:** workspacesuing same core module ([c706094](https://github.com/lokesh-coder/lesyjs/commit/c7060947088c0e4819ad182609b90949473d28bd))


### Performance Improvements

* update benchmark results ([c5dcd6e](https://github.com/lokesh-coder/lesyjs/commit/c5dcd6e7c8e6f8ae2f53b820e5f0178f377b29d3))





# [1.0.0-beta.6](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2020-08-19)


### Bug Fixes

* **compiler:** return print data when workspace is not enabled ([c72ad16](https://github.com/lokesh-coder/lesyjs/commit/c72ad1699381b230842cc98dee844dfe786d8ba0))
* **core:** set default cmd and ignore files prefix with _ ([fe9f781](https://github.com/lokesh-coder/lesyjs/commit/fe9f781ca6c3a04ebb77b63cbaad83b13c22c9b5))
* **docs:** update typos and modify terms ([ee51225](https://github.com/lokesh-coder/lesyjs/commit/ee51225f47d09fd7feeb85ad3af0a858e36b6cec))
* **lesy:** refactor scaffold templates ([a2776cf](https://github.com/lokesh-coder/lesyjs/commit/a2776cf9bb2e93ca8da3929fdf60265fa2dd4073))
* **lesy-plugin-sidekick:** exit verison middleware gracefully ([d7127f1](https://github.com/lokesh-coder/lesyjs/commit/d7127f1bbd2f68bef4e2cea9194d334860ee7e98))


### Features

* **compiler:** add support for workspace ([add61ac](https://github.com/lokesh-coder/lesyjs/commit/add61aceda5c660e3635a5d61b4438c983bfb90f))
* **core:** add support to ignore files while providing dir ([ff6b17f](https://github.com/lokesh-coder/lesyjs/commit/ff6b17f610e4229db43ac1d0ea19f09674c01fba))
* **lesy:** update templates for workspace support ([49e2569](https://github.com/lokesh-coder/lesyjs/commit/49e2569d2791a97cf3f0ade39037f0a9acd396a2))
* **lesy-pilot-ui:** add workspace screen ([70989b0](https://github.com/lokesh-coder/lesyjs/commit/70989b0fa19ebdca00461d14b4bb9db2c92e92e0))
* **lesy-plugin-pilot:** support multiple projects ([4b75655](https://github.com/lokesh-coder/lesyjs/commit/4b756556f5572a8b3071aa1d28ca72f93b2fe26e))





# [1.0.0-beta.5](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2020-06-22)

**Note:** Version bump only for package lesy





# [1.0.0-beta.4](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2020-06-21)

**Note:** Version bump only for package lesy





# [1.0.0-beta.3](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2020-06-17)


### Bug Fixes

* **lesy-pilot-ui:** allow optional required args ([ca9952c](https://github.com/lokesh-coder/lesyjs/commit/ca9952c37432939dc67c67693a72e52c0d61d1d1))
* **lesy-plugin-validator:** return middleware data ([e462264](https://github.com/lokesh-coder/lesyjs/commit/e462264e12331a92984579097175ef2dbeaa7d7a))
* **validator:** required rule not working when set to false ([5f9ab1d](https://github.com/lokesh-coder/lesyjs/commit/5f9ab1d134afb485b957e2625ea16fc6a1268c48))





# [1.0.0-beta.2](https://github.com/lokesh-coder/lesyjs/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2020-06-09)

**Note:** Version bump only for package lesy





# 1.0.0-beta.1 (2020-06-09)


### Features

* initial commit ([589700b](https://github.com/lokesh-coder/lesyjs/commit/589700ba0d0f738bbfd77c2f921b81c4098adec9))
