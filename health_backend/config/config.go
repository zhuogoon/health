package config

type Config struct {
	Mysql      Mysql  `yaml:"mysql"`
	Redis      Redis  `yaml:"redis"`
	UploadPath string `yaml:"upload_path"`
}
