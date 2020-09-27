#! /usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const execa = require("execa");
const listr = require("listr");
const inquirer = require("inquirer");

const dependencies = [
  "autoprefixer",
  "cssnano",
  "postcss-cli",
  "postcss-nested",
  "tailwindcss",
];
