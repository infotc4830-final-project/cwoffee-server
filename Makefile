# NOT RECOMMENDED
# NOT COMPLETE
# build image using Dockerfile
build-image:
	docker image build . -t <your_dockerhub_name>/<container_name>:tag

# NOT RECOMMENDED
# NOT COMPLETE
# create container using the image created by Dockerfile
run-image:
	docker run -p 5001:5001 <image_name/image_id>

# RECOMMENDED
# create an image and start a container using docker-compose
# REMEMBER: run "make down" after closing server, otherwise the container will continue to run.
up-dev:
	docker-compose up --build

# RECOMMENDED
# stopping a docker-compose container
down:
	docker-compose down