#!/bin/sh
{ # try
    docker rm $(docker stop $(docker ps | grep "bupazar/react_app" | cut -d ' ' -f1))  &&
    #save your output
    echo "Docker stopped successfully"

} || { # catch
    # save log for exception 
    echo "No running docker"
}
docker pull bupazar/react_app:latest
docker run -d -p 3000:3000 bupazar/react_app:latest
docker container prune -f
echo "Deleting the images with tag none"
{ # try
    docker rmi $(docker images | tr -s ' '| awk -F " " '$2 == "<none>" { print $3}')  &&
    #save your output
    echo "Docker images deleted"

} || { # catch
    # save log for exception 
    echo "No prior images"
}
echo "Deleting the images ids is completed"
