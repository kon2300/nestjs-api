#!/bin/bash

awslocal s3api create-bucket --bucket test-bucket
awslocal s3api list-buckets