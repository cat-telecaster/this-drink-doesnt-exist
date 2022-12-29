package model

type ImgGenResponse struct {
	GeneratedImgs       []string `json:"generatedImgs"`
	GeneratedImgsFormat string   `json:"generatedImgsFormat"`
}
