package config

type Redis struct {
	Addr     string `yaml:"addr"`
	Password string `yaml:"password"`
	DB       string `yaml:"DB"`
}

func (r Redis) GetAddr() string {
	return r.Addr
}

func (r Redis) GetPwd() string {
	return r.Password
}
