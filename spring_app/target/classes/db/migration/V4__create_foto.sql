-- Table `tarea2`.`foto`
CREATE TABLE IF NOT EXISTS `tarea2`.`foto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ruta_archivo` VARCHAR(300) NOT NULL,
  `nombre_archivo` VARCHAR(300) NOT NULL,
  `actividad_id` INT NOT NULL,
  PRIMARY KEY (`id`, `actividad_id`),
  INDEX `fk_foto_aviso1_idx` (`actividad_id` ASC),
  CONSTRAINT `fk_foto_aviso1`
    FOREIGN KEY (`actividad_id`)
    REFERENCES `tarea2`.`aviso_adopcion` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

