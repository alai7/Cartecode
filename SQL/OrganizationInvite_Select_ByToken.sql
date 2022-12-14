USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[OrgInvite_Select_ByToken]    Script Date: 10/14/2022 2:08:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <09/14/2022>
-- Description:	<Stored procedure to Select an OrgInvite by Token>
-- Code Reviewer:


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER PROC [dbo].[OrgInvite_Select_ByToken]
					@Token uniqueidentifier

AS
/*
DECLARE @Token uniqueidentifier = 'F43D0291-ECAF-48F3-A0AE-582DAFAF3A12'

EXECUTE dbo.OrgInvite_Select_ByToken
						@Token

SELECT *
FROM dbo.OrgInvite

*/
BEGIN

					SELECT [Id]
						  ,[FirstName]
						  ,[MiddleInitial]
						  ,[LastName]
						  ,[Email]
						  ,[Token]
						  ,[ExpirationSeconds]
						  ,[InviteTypeId]
						  ,[OrgId]
						  ,[CreateDate]
						  ,[ModifiedDate]
						  ,[ModifiedBy] as Creator
					  FROM [dbo].[OrgInvite]
					  WHERE [Token] = @Token


END
