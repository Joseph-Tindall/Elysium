<div align="center">
    <h1>Elysium</h1>
</div>

A C# .NET-based project revolving around silent software deployment and management for Windows machines. The repository is offered as [source-available](https://github.com/Joseph-Tindall/Elysium?tab=License-1-ov-file), allowing you to modify the source as needed, provided no financial profit or commercial gain is accomplished using the project.

When pulling the project, ensure to update the database for SQLite file, otherwise no table entires will exist for the database and a runtime error will occur.

```
"C:\Program Files\dotnet\dotnet.exe" ef database update --project Elysium.Server.Core\Elysium.Server.Core.csproj --startup-project Elysium.Server.Core\Elysium.Server.Core.csproj --context Elysium.Server.Core.Data.CoreDbContext --configuration Debug 20240603210953_Initial
```

## Vision

The project's main goal is to increase the quality of life for administrators by providing a free solution to maintain software versioning and system updates across the domain. This product is aimed at low-operating cost facilities, much like the research laboratories I started my career off in.

## Support

This project is offered on an AS-IS basis, I do not guarantee support for any issues that may arise.

&copy; 2024 Joseph Tindall. All Rights Reserved.
