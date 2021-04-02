help: ## Display available commands
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Setup all project dependencies
	docker-compose run server yarn --production=false

start: ## Start the server
	docker-compose up

stop: ## Stop the serve
	docker-compose down -v

unit-test: ## Run unit tests
	docker-compose run server yarn test
