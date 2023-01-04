package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"

	"this-drink-doesnt-exist/graph/model"
)

func GenerateImage(prompt string) (<-chan model.ImgGenResponse, <-chan error) {
	r := make(chan model.ImgGenResponse, 1)
	errs := make(chan error, 1)

	postParams := url.Values{}
	postParams.Add("text", prompt)
	postParams.Add("num_images", "1")

	go func() {
		defer close(r)
		defer close(errs)

		postURL := os.Getenv("IMG_API_URL")
		if postURL == "" {
			errs <- fmt.Errorf("URL is not loaded from .env")
		}

		resp, err := http.PostForm(postURL, postParams)
		if err != nil {
			errs <- err
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			errs <- err
		}

		// Unmarshal result
		post := model.ImgGenResponse{}
		err = json.Unmarshal(body, &post)
		if err != nil {
			errs <- err
		}

		r <- post
	}()

	return r, errs
}
