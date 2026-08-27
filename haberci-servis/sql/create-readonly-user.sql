-- Haberci servis için salt-okunur (read-only) SQL Server kullanıcısı.
-- Üretim SQL Server'ında, yetkili bir DBA/IT hesabıyla çalıştırın.
--
-- En az yetki (least privilege) ilkesiyle: bu kullanıcı yalnızca
-- dbo.BILDIRIM_LOG tablosunu okuyabilir. Veritabanındaki başka hiçbir
-- tabloya (parça, müşteri, kullanıcı, kalite kararı detayları vb.)
-- erişimi yoktur — sadece bildirim geçmişini görür. Yazma yetkisi
-- (INSERT/UPDATE/DELETE/DDL) hiçbir tabloda YOKTUR.

USE [master];
GO

CREATE LOGIN [haberci_readonly] WITH PASSWORD = N'BURAYA_GUCLU_BIR_SIFRE_YAZIN!';
GO

USE [ERMAK_URETIM];
GO

CREATE USER [haberci_readonly] FOR LOGIN [haberci_readonly];
GO

-- Sadece BILDIRIM_LOG tablosuna, sadece SELECT (okuma) yetkisi ver
GRANT SELECT ON dbo.BILDIRIM_LOG TO [haberci_readonly];
GO

-- Doğrulama: bu kullanıcının başka bir tabloyu okuyamadığını ve
-- hiçbir tabloya yazamadığını teyit edin (aşağıdaki sorgular hata
-- vermelidir, bu beklenen davranıştır)
-- EXECUTE AS USER = 'haberci_readonly';
-- SELECT TOP 1 * FROM dbo.KULLANICILAR; -- reddedilmeli
-- INSERT INTO dbo.BILDIRIM_LOG (...) VALUES (...); -- reddedilmeli
-- REVERT;
