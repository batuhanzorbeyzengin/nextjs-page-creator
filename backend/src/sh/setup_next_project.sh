#!/bin/bash

project_path=$1
project_name=$2

repo_url="https://github.com/batuhanzorbeyzengin/nextjs-base-template.git"

cd $project_path

git clone $repo_url $project_name

cd $project_name

npm install