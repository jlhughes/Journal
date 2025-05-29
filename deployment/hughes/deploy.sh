#!/bin/bash
./build.sh -ckJjournal,hughes,https "$@"
./build.sh -TStandard,RemoteInstall,Java -Jjournal,hughes,https --backup:false --remote-hostname:moosehead
