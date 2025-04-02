package main

// import (
// 	"jira-demo/service"
// 	"encoding/json"
// 	"net/http"
// 	"time"

// 	"github.com/go-chi/chi/v5"
// 	"github.com/go-chi/jwtauth"
// )

// func (app *Application) AuthRoute(apiRouter *chi.Mux) {

// 	apiRouter.Route("/auth", func(r chi.Router) {
// 		r.Post("/login", app.Login)
// 		r.Get("/check_authen", app.CheckAuthen)
// 		r.Group(func(router chi.Router) {
// 			router.Use(jwtauth.Verifier(app.TokenAuth))
// 			router.Use(jwtauth.Authenticator)

// 			apiRouter.Post("/logout", app.Logout)
// 		})
// 	})
// }

// // Generate JWT token with username's payload
// func (app *Application) GenerateToken(username, department string) string {
// 	_, tokenString, _ := app.TokenAuth.Encode(map[string]interface{}{"username": username, "department": department})
// 	return tokenString
// }

// // Login handles user login requests and generates a token for the authenticated user.
// // @Summary User Login
// // @Description Handles user login requests and generates a token for the authenticated user.
// // @ID user-login
// // @Tags Authentication
// // @Accept json
// // @Produce json
// // @Param userLoginRequest body service.UserLoginRequest true "User login credentials in JSON format"
// // @Router /auth/login [post]
// func (app *Application) Login(w http.ResponseWriter, r *http.Request) {
// 	if r.Header.Get("content-type") != "application/json" {
// 		http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
// 		return
// 	}
// 	req := service.UserLoginRequest{}
// 	err := json.NewDecoder(r.Body).Decode(&req)
// 	if err != nil {
// 		handleError(w, err)
// 		return
// 	}

// 	user, err := app.Service.User.UserValidate(req)
// 	if err != nil {
// 		handleError(w, err)
// 		return
// 	}
// 	token := app.GenerateToken(user.UserName, user.Department)

// 	http.SetCookie(w, &http.Cookie{
// 		HttpOnly: false,
// 		Expires:  time.Now().Add(4 * time.Hour), //4 hours life
// 		SameSite: http.SameSiteLaxMode,
// 		Name:     "jwt", // Must be named "jwt" or else the token cannot be searched for by jwtauth.Verifier.
// 		Value:    token,
// 		Path:     "/",
// 	})
// 	w.WriteHeader(http.StatusOK)

// 	w.Header().Set("content-type", "application/json")
// 	json.NewEncoder(w).Encode(user)
// }

// func (app *Application) Logout(w http.ResponseWriter, r *http.Request) {
// 	http.SetCookie(w, &http.Cookie{
// 		HttpOnly: true,
// 		MaxAge:   -1, // Delete the cookie.
// 		SameSite: http.SameSiteLaxMode,
// 		Name:     "jwt",
// 		Value:    "",
// 	})
// 	w.WriteHeader(http.StatusOK)

// }

// // @Summary Test endpoint
// // @Description A test endpoint to demonstrate Swagger documentation
// // @ID test-check-authen
// // @Tags Testing
// // @Accept json
// // @Produce json
// // @Success 200 {object} service.User "Welcome to the API!"
// // @Router /auth/checkAuthen [get]
// func (app *Application) CheckAuthen(w http.ResponseWriter, r *http.Request) {
// 	_, claims, _ := jwtauth.FromContext(r.Context())
// 	w.Header().Set("content-type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(claims)

// }
