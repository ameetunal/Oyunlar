-- Haberci servis için salt-okunur (read-only) SQL Server kullanıcısı.
-- Üretim SQL Server'ında, yetkili bir DBA/IT hesabıyla çalıştırın.
-- Bu kullanıcı yalnızca SELECT yapabilir; INSERT/UPDATE/DELETE/DDL yetkisi YOKTUR.

USE [master];
GO

CREATE LOGIN [haberci_readonly] WITH PASSWORD = N'BURAYA_GUCLU_BIR_SIFRE_YAZIN!';
GO

-- Aşağıdaki veritabanı adını gerçek üretim takip veritabanınızın adıyla değiştirin
USE [ERMAK_UretimTakip];
GO

CREATE USER [haberci_readonly] FOR LOGIN [haberci_readonly];
GO

-- db_datareader rolü sadece okuma (SELECT) yetkisi verir
ALTER ROLE [db_datareader] ADD MEMBER [haberci_readonly];
GO

-- Doğrulama: bu kullanıcının yazma yetkisi olmadığını teyit edin
-- (aşağıdaki sorgu hata vermelidir, bu beklenen davranıştır)
-- EXECUTE AS USER = 'haberci_readonly';
-- INSERT INTO dbo.IsKayitlari (...) VALUES (...); -- reddedilmeli
-- REVERT;
