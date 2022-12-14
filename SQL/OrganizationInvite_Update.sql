USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[OrgInvite_Update]    Script Date: 10/14/2022 2:08:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Anthony Lai>
-- Create date: <09/14/2022>
-- Description:	<Stored procedure to Update an OrgInvite>
-- Code Reviewer:


-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note: 
-- =============================================
ALTER PROC [dbo].[OrgInvite_Update]
				@Id int
				,@FirstName nvarchar(50)
				,@MiddleInitial nchar(1)
				,@LastName nvarchar(50)
				,@Email nvarchar(255)
				,@Token uniqueidentifier
				,@ExpirationSeconds int
				,@InviteTypeId int
				,@OrgId int 
				,@UserId int

AS
/*
DECLARE			@Id int = 3
				,@FirstName nvarchar(50) = 'Paul'
				,@MiddleInitial nchar(1) = 'J'
				,@LastName nvarchar(50) = 'Kim'
				,@Email nvarchar(255) = 'KimP@dispostable.com'
				,@Token uniqueidentifier = 'E381219D-F5E7-4A58-8429-8643D8E3EDDD'
				,@ExpirationSeconds int = '50000'
				,@InviteTypeId int = '4'
				,@OrgId int = 1
				,@UserId nvarchar(128) = 1
SELECT *
FROM dbo.OrgInvite
WHERE Id = @Id		

EXECUTE dbo.OrgInvite_Update
				@Id
				,@FirstName
				,@MiddleInitial
				,@LastName
				,@Email
				,@Token
				,@ExpirationSeconds
				,@InviteTypeId
				,@OrgId
				,@UserId
				

SELECT *
FROM dbo.OrgInvite
WHERE Id = @Id




*/
BEGIN

				DECLARE @DateModified datetime2(7) = getutcdate()

				UPDATE [dbo].[OrgInvite]
				   SET [FirstName] = @FirstName
					  ,[MiddleInitial] = @MiddleInitial
					  ,[LastName] = @LastName
					  ,[Email] = @Email
					  ,[Token] = @Token
					  ,[ExpirationSeconds] = @ExpirationSeconds
					  ,[InviteTypeId] = @InviteTypeId
					  ,[OrgId] = @OrgId
					  ,[ModifiedDate] = @DateModified
					  ,[ModifiedBy] = @UserId
				 WHERE [Id] = @Id

END

