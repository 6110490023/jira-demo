package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	"jira-demo/internal/infrastructure/domain"

	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/golang-jwt/jwt/v5"
	httpSwagger "github.com/swaggo/http-swagger/v2"
)

// Define route of service and middleware relate
func (app *Application) routes() http.Handler {
	router := chi.NewRouter()
	//CORS Middleware
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:10000", "https://jira-demo-front.onrender.com"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"X-PINGOTHER", "Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum cache age (in seconds)
	})
	router.Use(cors.Handler)
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	apiRouter := chi.NewRouter()
	apiRouter.Get("/", app.checkAPI)

	apiRouter.Get("/swagger/*", httpSwagger.Handler())
	app.TaskRoute(apiRouter)
	app.UserRoute(apiRouter)
	router.Mount("/api", apiRouter)
	return router

}

func (app *Application) checkAPI(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome to the API!"))
}

func (app *Application) JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		const bearerPrefix = "Bearer "
		if len(authHeader) < len(bearerPrefix) || authHeader[:len(bearerPrefix)] != bearerPrefix {
			http.Error(w, "Unauthorized: Invalid token format", http.StatusUnauthorized)
			return
		}

		// ดึงเฉพาะ Token (ตัด "Bearer " ออก)
		tokenString := authHeader[len(bearerPrefix):]

		token, err := jwt.ParseWithClaims(tokenString, &domain.Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(app.Config.JWTSerect), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		next.ServeHTTP(w, r)
	})
}
