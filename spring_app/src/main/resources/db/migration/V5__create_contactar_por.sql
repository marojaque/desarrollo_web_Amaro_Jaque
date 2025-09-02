-- Table `tarea2`.`contactar_por`
CREATE TABLE IF NOT EXISTS `tarea2`.`contactar_por` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` ENUM('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra') NOT NULL,
  `identificador` VARCHAR(150) NOT NULL,
  `actividad_id` INT NOT NULL,
  PRIMARY KEY (`id`, `actividad_id`),
  INDEX `fk_contactar_por_aviso1_idx` (`actividad_id` ASC),
  CONSTRAINT `fk_contactar_por_aviso1`
    FOREIGN KEY (`actividad_id`)
    REFERENCES `tarea2`.`aviso_adopcion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

