#!/bin/bash
sudo cp .env_prod .env
# Start the first process
node ./src/apolloserver/fixtureServiceMemoryStorage.mjs &
  
# Start the second process
npm run serve &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?