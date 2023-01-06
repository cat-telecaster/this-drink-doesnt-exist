package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type PostData struct {
	Text      string `json:"text"`
	NumImages int    `json:"num_images"`
}

func GenerateImage(prompt string) (<-chan string, error) {
	r := make(chan string, 1)
	errs := make(chan error, 1)

	postData := &PostData{
		Text:      prompt,
		NumImages: 1,
	}

	go func() {
		defer close(r)
		defer close(errs)

		p, err := json.Marshal(postData)
		if err != nil {
			errs <- err
		}

		postURL := os.Getenv("IMG_API_URL") + "/generate"
		if postURL == "" {
			errs <- fmt.Errorf("URL is not loaded from .env")
		}

		resp, err := http.Post(postURL, "application/json", bytes.NewBuffer(p))
		if err != nil {
			errs <- err
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			errs <- err
		}

		// Unmarshal result
		var res map[string]interface{}
		err = json.Unmarshal(body, &res)
		if err != nil {
			errs <- err
		}

		genSlice, ok := res["generatedImgs"].([]interface{})
		if !ok {
			errs <- fmt.Errorf("could not decode 'generatedImgs' key in response body")
		}

		b64Image, ok := genSlice[0].(string)
		if !ok {
			errs <- fmt.Errorf("could not extract base64 string from 'generatedImgs' field in response body")
		}

		r <- b64Image
		errs <- nil
	}()

	err := <-errs

	return r, err
}
