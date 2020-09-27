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
  "postcss-cli",
  "postcss-nested",
  "tailwindcss",
];

const root_dir = "./" + process.argv.slice(2);

// The tasks
const tasks = new listr([
  {
    title: "Create directory structure",
    task: () => {
      const tree = ["dist/assets/css", "dist/assets/img"];

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
  {
    title: "Create project files",
    task: () => {},
  },
]);

tasks.run().catch((err) => console.log(err));
