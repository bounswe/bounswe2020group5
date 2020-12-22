#!/bin/sh
{ # try
    docker rm $(docker stop $(docker ps | grep "bupazar/django_app" | cut -d ' ' -f1))  &&
    #save your output
    echo "Docker image deleted"

} || { # catch
    # save log for exception 
    echo "No prior image"
}
docker pull bupazar/django_app:latest
docker run -d -p 8000:8000 bupazar/django_app:latest
IMAGE_IDS=$(docker images | tr -s ' '| awk -F " " '$2 == "<none>" { print $3}')
echo "Deleting the image with id $IMAGE_IDS"
docker rmi $IMAGE_IDS