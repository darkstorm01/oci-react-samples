#!/bin/bash

export SPRING_DATASOURCE_URL="jdbc:oracle:thin:@//$(kubectl -n cloudbank get singleinstancedatabase cbtransfer01 -o jsonpath='{.status.pdbConnectString}')"
export SPRING_DATASOURCE_PASSWORD="$(state_get .lab.fixed_demo_user_credential)"
export SPRING_DATASOURCE_USERNAME=flowershop_mgr