#! /usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const execa = require("execa");
const listr = require("listr");
const inquirer = require("inquirer");
const { exit } = require("process");

const dependencies = [
  "autoprefixer",
  "cssnano",
  "postcss",
  "postcss-cli",
  "postcss-nested",
  "tailwindcss",
  "live-server",
  "concurrently",
];

const root_dir = "./" + process.argv.slice(2);

// The tasks
const tasks = new listr([
  // 1. create directory
  {
    title: "Create directory structure",
    task: () => {
      const tree = [
        "public/assets/css",
        "public/assets/img",
        "public/assets/font",
      ];

      if (fs.existsSync(root_dir)) {
        throw new Error(`Project directory ${root_dir} already exists`);
      }
      fs.mkdirSync(root_dir);

      tree.forEach((branch) => {
        const dir = path.join(root_dir, branch);
        fs.mkdirSync(dir, { recursive: true }, (err) => {
          if (err) throw new Error(`Cannot create directory ${dir}: ${err}`);
        });
      });
    },
  },
  // 2. create files
  {
    title: "Create project files",
    task: () => {
      return new listr([
        // 2a. tailwind.config.js
        {
          title: "Create default tailwind.config.js",
          task: async () => {
            const source = path.join(__dirname, "files", "tailwind.config.js");
            const destination = path.join(root_dir, "tailwind.config.js");

            fs.copyFile(source, destination, (err) => {
              if (err)
                throw new Error(`Cannot create tailwind.config.js: ${err}`);
            });
          },
        },
        // 2b. postcss
        {
          title: "Create PostCSS configuration",
          task: async () => {
            const source = path.join(__dirname, "files", "postcss.config.js");
            const destination = path.join(root_dir, "postcss.config.js");

            fs.copyFile(source, destination, (err) => {
              if (err)
                throw new Error(`Cannot create PostCSS configuration: ${err}`);
            });
          },
        },
        // 2c. tailwind.css
        {
          title: "Create default tailwind.css",
          task: async () => {
            const source = path.join(__dirname, "files", "tailwind.css");
            const destination = path.join(root_dir, "tailwind.css");

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create tailwind.css: ${err}`);
            });
          },
        },
        // 2d. index.html
        {
          title: "Create index.html",
          task: async () => {
            const source = path.join(__dirname, "files", "index.html");
            const destination = path.join(root_dir, "public", "index.html");

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create index.html: ${err}`);
            });
          },
        },
        // 2e. gitignore
        {
          title: "Create gitignore file",
          task: async (context) => {
            const source = path.join(__dirname, "files", "_gitignore");
            const destination = path.join(root_dir, ".gitignore");

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create gitignore file: ${err}`);
            });
          },
        },
      ]);
    },
  },
  // 3. setup dependencies
  {
    title: "Setup dependencies",
    task: () => {
      return new listr([
        // 3a. package.json
        {
          title: "Create package.json",
          task: async (context) => {
            const source = path.join(__dirname, "files", "package.json");
            const destination = path.join(root_dir, "package.json");

            fs.copyFile(source, destination, (err) => {
              if (err) throw new Error(`Cannot create package.json: ${err}`);
            });
          },
        },
        //3b. Install depedencies
        {
          title: "Install dependencies",
          task: async () => {
            const params = ["install", "--save-dev"];
            process.chdir(root_dir);
            await execa("npm", [...params, ...dependencies]);
          },
        },
      ]);
    },
  },
]);

tasks.run().catch((err) => console.log(err));
