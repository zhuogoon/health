package db

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"health_backend/global"
	"health_backend/models"
	"health_backend/models/request"
	"health_backend/models/response"
)

func CreateDoctor(d *request.Doctor) error {

	pwd, err := bcrypt.GenerateFromPassword([]byte(d.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	err = global.DB.Transaction(func(tx *gorm.DB) error {
		user := &models.User{
			Username: d.Username,
			Password: string(pwd),
			Role:     models.Doc,
		}
		err := tx.Model(&models.User{}).Create(&user).Error
		if err != nil {
			return err
		}
		doctor := &models.Doctor{
			UserId:   user.ID,
			Name:     d.Name,
			Honor:    d.Honor,
			JobTitle: d.JobTitle,
			JobType:  d.JobType,
			Phone:    d.Phone,
		}
		err = tx.Model(&models.Doctor{}).Create(&doctor).Error
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil
}

func UpdateDoctorInfo(d *request.UpdateDoctor) error {
	id, err := FindIdByUserId()
	if err != nil {
		return err
	}

	doctor := &models.Doctor{
		UserId:   d.UserId,
		Name:     d.Name,
		Honor:    d.Honor,
		JobTitle: d.JobTitle,
		JobType:  d.JobType,
		Phone:    d.Phone,
	}
	return global.DB.Model(&models.Doctor{}).Where("id = ?", id).Updates(&doctor).Error
}

func FindIdByUserId() (uint, error) {
	d := &models.Doctor{}
	err := global.DB.Model(&models.Doctor{}).Where("user_id = ?", global.UserId).First(&d).Error
	if err != nil {
		return 0, err
	}
	return d.ID, nil
}

func DeleteDoctor() error {
	err := global.DB.Transaction(func(tx *gorm.DB) error {
		err := tx.Model(&models.Doctor{}).Where("user_id = ?", global.UserId).Delete(&models.Doctor{}).Error
		if err != nil {
			return err
		}
		err = tx.Model(&models.User{}).Where("id = ?", global.UserId).Delete(&models.User{}).Error
		if err != nil {
			return err
		}
		return nil
	})
	if err != nil {
		return err
	}
	return nil
}

func AddCheck(ch *request.AddCheck) error {
	c := &models.Check{
		PatientId:      ch.PatientId,
		DoctorId:       ch.DoctorId,
		CheckProjectId: ch.CheckProjectId,
	}
	return global.DB.Model(&models.Check{}).Create(&c).Error
}

func GetDoctorJobType() ([]string, error) {
	var job []string
	if err := global.DB.Model(&models.Doctor{}).Select("job_type").Find(&job).Error; err != nil {
		return nil, err
	}
	return job, nil
}

func GetDoctorByQuery(name, jobType string) ([]response.DoctorCard, error) {
	var doctors []response.DoctorCard
	query := global.DB.Table("doctors").
		Select("doctors.id, doctors.name, doctors.honor, doctors.job_title, doctors.job_type, doctors.phone, users.avatar").
		Joins("left join users on users.id = doctors.user_id")

	if name != "" {
		query = query.Where("doctors.name LIKE ?", "%"+name+"%")
	}
	if jobType != "" {
		query = query.Where("doctors.job_type LIKE ?", "%"+jobType+"%")
	}

	err := query.Find(&doctors).Error
	return doctors, err
}
func GetLatestCaseByUserID(userID uint) (*models.Case, error) {
	var patientID uint
	err := global.DB.Table("patients").Select("id").Where("user_id = ?", userID).Scan(&patientID).Error
	if err != nil {
		return nil, err
	}

	var latestCase models.Case
	err = global.DB.Table("cases").
		Where("patient_id = ?", patientID).
		Order("created_at DESC").
		Limit(1).
		Scan(&latestCase).Error
	if err != nil {
		return nil, err
	}
	if latestCase.ID == 0 {
		return nil, nil
	}
	return &latestCase, nil
}
