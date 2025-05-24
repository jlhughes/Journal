#!/bin/bash
./build.sh -ckJjournal,huhges,https -Njournal_huhges "$@"
./build.sh -TStandard,RemoteInstall,Java --backup:false --remote-hostname:moosehead --app-name:journal_huhges --web-port:8100
