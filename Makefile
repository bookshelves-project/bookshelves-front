.PHONY: help

# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install npm dependencies for the api, admin, and frontend apps
	@echo "Installing Node dependencies"
	@pnpm install

install-dev: install ## Install dependencies and prepared development configuration
	@./node_modules/.bin/selenium-standalone install
	@cp -n ./config/development.js-dist ./config/development.js | true

clean: ## Clean node_modules and build directories
	@rm -rf .nuxt
	@rm -rf .output
	@rm -rf node_modules
	$(MAKE) install

run-frontend-dev: webpack.PID ## Run the frontend and admin apps in dev (using webpack-dev-server)

webpack.PID:
	@./node_modules/.bin/babel-node ./node_modules/.bin/webpack-dev-server \
		--content-base=build \
		--devtool=cheap-module-inline-source-map \
		--hot \
		--inline \
		--progress \
		& echo "$$!" > webpack.PID

stop-frontend-dev: webpack.PID ## Stop the frontend and admin apps in dev
	@kill `cat $<` && rm $<
	@echo "Webpack server stopped"

restart-frontend: ## Restart the frontend and admin apps in dev
		@make stop-frontend-dev && make run-frontend-dev
		@echo "Frontend app restarted"