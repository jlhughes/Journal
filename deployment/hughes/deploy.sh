#!/bin/bash
./build.sh -ckJjournal,hughes,https "$@"
./build.sh -TStandard,Java,RemoteInstall -Jjournal,hughes,https --backup:false --remote-hostname:moosehead
