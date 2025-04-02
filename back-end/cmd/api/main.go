package main

import (
	"flag"
	"jira-demo/config"

	_ "jira-demo/cmd/api/docs"
	sqladaptor "jira-demo/internal/infrastructure/sql"

	"jira-demo/internal/repository"
	"jira-demo/internal/usecase"
	"jira-demo/logs"

	_ "github.com/denisenkom/go-mssqldb"
)

// @title jiraDemoAPI
// @version 1.0
// @description This is a sample server Petstore server.
// contact.name API Support

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

// @BasePath /api
func main() {
	//Flag variable
	serviceName := "JIRA DEMO SERVICE"
	logger, logClose, err := logs.NewLogger(serviceName, "./error.log", 1, 1, 7)
	defer logClose()
	if err != nil {
		panic(err)
	}

	appConfig := config.GetAppConfig()

	flag.IntVar(&appConfig.Port, "port", 8080, "Application server port")
	flag.Parse()
	db, err := sqladaptor.GetClientSQL(appConfig.Username, appConfig.Password, appConfig.HostName, appConfig.NameDB)
	if err != nil {
		logger.Fatal(err.Error())
	}
	defer db.Close()

	taskRepo := repository.NewTaskRepo(db)
	userRepo := repository.NewUserRepo(db)

	if err != nil {
		logger.Fatal(err.Error())
	}

	//Instance Usecase
	ucTask := usecase.NewTaskUseCase(&taskRepo, *logger)
	ucUser := usecase.NewUserUseCase(&userRepo, appConfig.JWTSerect, *logger)
	handlerUsecase := HandlerUseCase{
		Task: &ucTask,
		User: &ucUser,
	}
	//Instance application
	app := &Application{
		Config:         appConfig,
		Logger:         *logger,
		HandlerUseCase: handlerUsecase,
	}

	// Run application
	err = app.Serve()
	if err != nil {
		logger.Fatal(err.Error())
	}

}
