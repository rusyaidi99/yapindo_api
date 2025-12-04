#!/bin/bash
./wait-for-it.sh db:3306 -- npm run migrate
npm run dev