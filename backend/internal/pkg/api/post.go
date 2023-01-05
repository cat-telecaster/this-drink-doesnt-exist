package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"this-drink-doesnt-exist/graph/model"
)

type PostData struct {
	Text      string `json:"text"`
	NumImages int    `json:"num_images"`
}

func GenerateImage(prompt string) (<-chan model.ImgGenResponse, <-chan error) {
	r := make(chan model.ImgGenResponse, 1)
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
		var res *model.ImgGenResponse
		err = json.Unmarshal(body, &res)
		if err != nil {
			errs <- err
		}

		r <- *res
	}()

	return r, errs
}
