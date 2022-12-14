USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[OrgInvite_Insert]    Script Date: 10/14/2022 2:08:22 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <09/14/2022>
-- Description:	<Stored procedure to Create an OrgInvite>
-- Code Reviewer:


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER proc	[dbo].[OrgInvite_Insert]
				@FirstName nvarchar(50)
				,@MiddleInitial nchar(1)
				,@LastName nvarchar(50)
				,@Email nvarchar(255)
				,@Token uniqueidentifier
				,@ExpirationSeconds int
				,@InviteTypeId int
				,@OrgId int 
				,@UserId int
				,@Id int OUTPUT

AS
/*
DECLARE			@Id int = 0;

DECLARE			@FirstName nvarchar(50) = 'Anthony'
				,@MiddleInitial nchar(1) = 'J'
				,@LastName nvarchar(50) = 'Choi'
				,@Email nvarchar(255) = 'AnthonyL@dispostable.com'
				,@Token uniqueidentifier
				,@ExpirationSeconds int = '50000'
				,@InviteTypeId int = '4'
				,@OrgId int = 1
				,@UserId nvarchar(128) = 1
				

EXECUTE dbo.OrgInvite_Insert
				@FirstName
				,@MiddleInitial
				,@LastName
				,@Email
				
				,@ExpirationSeconds
				,@InviteTypeId
				,@OrgId
				,@UserId
				,@Id OUTPUT

SELECT *
FROM dbo.OrgInvite
SELECT *
FROm dbo.Organizations

*/
BEGIN

		INSERT INTO [dbo].[OrgInvite]
					([FirstName]
					,[MiddleInitial]
					,[LastName]
					,[Email]
					,[Token]
					,[ExpirationSeconds]
					,[InviteTypeId]
					,[OrgId]
					,[ModifiedBy])
			VALUES
					(@FirstName
					,@MiddleInitial
					,@LastName
					,@Email
					,@Token
					,@ExpirationSeconds
					,@InviteTypeId
					,@OrgId
					,@UserId)
					
				SET @Id = SCOPE_IDENTITY()


END


