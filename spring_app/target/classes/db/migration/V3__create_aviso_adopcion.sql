-- Table `tarea2`.`aviso_adopcion`
CREATE TABLE IF NOT EXISTS `tarea2`.`aviso_adopcion` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha_ingreso` DATETIME NOT NULL,
  `comuna_id` INT NOT NULL,
  `sector` VARCHAR(100) NULL,
  `nombre` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `celular` VARCHAR(15) NULL,
  `tipo` ENUM('gato', 'perro') NOT NULL,
  `cantidad` INT NOT NULL,
  `edad` INT NOT NULL,
  `unidad_medida` ENUM('a', 'm') NOT NULL,
  `fecha_entrega` DATETIME NOT NULL,
  `descripcion` TEXT(500) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_aviso_comuna1_idx` (`comuna_id` ASC),
  CONSTRAINT `fk_aviso_comuna1`
    FOREIGN KEY (`comuna_id`)
    REFERENCES `tarea2`.`comuna` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

