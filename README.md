flowchart TD
    START([🚨 Emergency Detected])

    START --> Q1{Loss of Reactor Cooling / Water?}
    
    %% --- Coolant Failure ---
    Q1 -->|YES| CF1[Rods to 100%<br/>(80% if one pump down)]
    CF1 --> CF2[Call PM]
    CF2 --> CF3[Set Turbine Valves to 100%<br/>(Feedwater issue)]
    CF3 --> Q1A{T ≥ 1450 K?}
    Q1A -->|YES| CF4[Cycle Relief Valves]
    Q1A -->|NO| Q2
    CF4 --> Q1B{T ≥ 1600 K?}
    Q1B -->|YES| CF5[Use ALL Relief Valves]
    Q1B -->|NO| Q2
    CF5 --> Q2

    %% --- Grid Failure ---
    Q1 -->|NO| Q2{Electrical Grid Failure?}
    Q2 -->|YES| Q2A{Both Turbines Desynced?}

    Q2A -->|YES| GF1[Switch to Emergency Config (2 & 5)]
    GF1 --> GF2[Ensure Generators ON]
    GF2 --> GF3[SM cuts DC Bus]
    GF3 --> GF4[Call PM/Security<br/>Fix Transformers]
    GF4 --> Q3

    Q2A -->|NO| GF5[Switch to Turbine Config (1 & 3)]
    GF5 --> GF6[Set Synced Turbine Valve to 100%]
    GF6 --> GF7[Maintain T ≈ 1420 K]
    GF7 --> GF8[Call PM/Security<br/>Fix Transformers]
    GF8 --> GF9[Sync Second Turbine ASAP]
    GF9 --> Q3

    %% --- Security Threat ---
    Q2 -->|NO| Q3{WN Attack / Invasion?}
    Q3 -->|YES| Q3A{In Control Room?}

    Q3A -->|YES| ST1[Rods to 100%]
    ST1 --> ST2[Use ALL Relief Valves]
    ST2 --> ST3[Call Security]
    ST3 --> ST4[Prepare for Reactor Stall]
    ST4 --> Q4

    Q3A -->|NO| ST5[Initiate Reactor Stall]
    ST5 --> ST6[Cool to 323 K]
    ST6 --> Q4

    %% --- Meltdown ---
    Q3 -->|NO| Q4{Reactor Meltdown?<br/>(T ≥ 3120 K)}
    Q4 -->|YES| MD1[Rods to 100%]
    MD1 --> MD2[Coolant Valve ON]
    MD2 --> MD3[Feedwater Valve ON]
    MD3 --> MD4[Use ALL Relief Valves]
    MD4 --> MD5[Press SCRAM (~45s)]
    MD5 --> MD6[Goal: ≤ 800 K<br/>within 4 min]
    MD6 --> Q4A{T > 3500 K?}
    Q4A -->|YES| MD7[🚨 EVACUATE]
    Q4A -->|NO| END

    %% --- Normal Ops ---
    Q4 -->|NO| END([Continue Normal Ops / Troubleshoot])


