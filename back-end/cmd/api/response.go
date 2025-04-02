package main

import (
	"encoding/json"
	"jira-demo/errors"
	"net/http"
)

// Response represents the standard API response structure.
// @swagger:response
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Result  interface{} `json:"result,omitempty"`
}

func handleResponse(w http.ResponseWriter, success bool, message string, result interface{}, statusCode int) {
	// Set default message to "success" if the input message is empty
	if message == "" {
		message = "success"
	}

	response := Response{
		Success: success,
		Message: message,
		Result:  result,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(response)
}

func handleError(w http.ResponseWriter, err error) {
	switch e := err.(type) {
	case errors.AppError:
		handleResponse(w, false, e.Message, nil, e.Code)
	default:
		handleResponse(w, false, err.Error(), nil, http.StatusInternalServerError)
	}
}
