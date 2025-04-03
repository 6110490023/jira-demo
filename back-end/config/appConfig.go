package config

import (
	"context"
	"log"

	"github.com/joho/godotenv"
	"github.com/sethvargo/go-envconfig"
)

var conf *AppConfig

type AppConfig struct {
	Port int `env:"PORT,required"`

	Username  string `env:"USERNAME_DB,required"`
	Password  string `env:"PASSWORD_DB,required"`
	HostName  string `env:"HOST_DB,required"`
	NameDB    string `env:"NAME_DB,required"`
	JWTSerect string `env:"JWT_SERECT,required"`
}

func GetAppConfig() *AppConfig {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	var config AppConfig
	if err := envconfig.Process(context.Background(), &config); err != nil {
		panic(err)
	}

	conf = &config

	return conf
}
