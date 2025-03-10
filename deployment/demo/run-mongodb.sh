#!/bin/bash
#./build.sh -Jjournal,demo -Njournal_demo -W8100 "$@"
./build.sh -Ppom,foam3/src/foam/dao/mongodb/pom-all -Jjournal,demo,../foam3/deployment/mongodb -Njournal_demo -W8100 "$@"
