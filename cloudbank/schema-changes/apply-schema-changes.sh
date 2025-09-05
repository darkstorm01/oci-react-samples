#!/bin/bash

location=$1
password=$2
connection=$3
version=$4

{
  echo "set cloudconfig $location"
  echo "conn bankauser/$password@$connection"
  echo "lb tag -tag $version"
  echo "lb update -changelog-file controller.yaml"
  echo "conn bankbuser/$password@$connection"
  echo "lb tag -tag $version"
  echo "lb update -changelog-file controller.yaml"
} | sql /nolog