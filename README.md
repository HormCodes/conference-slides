# Conference Slides

Monorepo hosting [slides.horm.codes](https://slides.hormcodes), a website with slides to all conference talks I've given.

The repository uses Nx to manage all conferences.
However, unlike typical Nx workspace, Nx deploys all projects as a single app to a single domain using Vercel.

## Getting Started

```shell
git clone https://github.com/HormCodes/conference-slides.git
cd conference-slides
yarn install
yarn nx run-many -t build
```

## License

The code in this repository is licensed under the MIT license. See [LICENSE](LICENSE) for more information. The license does not apply to the actual content of the slides.
