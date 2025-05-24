#!/bin/bash
./build.sh -ckJjournal,demo,https -Njournal_demo "$@"
./build.sh -TStandard,RemoteInstall,Java --backup:false --remote-hostname:moosehead --app-name:journal_demo --web-port:8100
