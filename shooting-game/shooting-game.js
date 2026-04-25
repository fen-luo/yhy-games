const WEAPONS = {
    assault: [
        {
            id: 'ak47',
            name: 'AK-47 突击步枪',
            damage: 35,
            fireRate: 600,
            optimalRange: 40,
            rangeFalloff: 0.005,
            recoil: 0.035,
            stability: 0.7,
            magSize: 30,
            reserveAmmo: 120,
            reloadTime: 2.5,
            spread: 0.02,
            pros: ['高伤害', '可靠性好'],
            cons: ['后坐力较大', '射速一般']
        },
        {
            id: 'm4a1',
            name: 'M4A1 卡宾枪',
            damage: 30,
            fireRate: 750,
            optimalRange: 45,
            rangeFalloff: 0.004,
            recoil: 0.025,
            stability: 0.8,
            magSize: 30,
            reserveAmmo: 150,
            reloadTime: 2.2,
            spread: 0.015,
            pros: ['射速快', '稳定性好'],
            cons: ['伤害一般', '需要更多命中']
        },
        {
            id: 'scarh',
            name: 'SCAR-H 战斗步枪',
            damage: 40,
            fireRate: 550,
            optimalRange: 50,
            rangeFalloff: 0.0045,
            recoil: 0.04,
            stability: 0.65,
            magSize: 20,
            reserveAmmo: 100,
            reloadTime: 2.8,
            spread: 0.018,
            pros: ['伤害高', '射程远'],
            cons: ['弹匣小', '后坐力大']
        }
    ],
    smg: [
        {
            id: 'mp5',
            name: 'MP5 冲锋枪',
            damage: 22,
            fireRate: 800,
            optimalRange: 18,
            rangeFalloff: 0.012,
            recoil: 0.015,
            stability: 0.9,
            magSize: 30,
            reserveAmmo: 180,
            reloadTime: 2.0,
            spread: 0.025,
            pros: ['稳定性极佳', '射速快'],
            cons: ['伤害低', '射程短']
        },
        {
            id: 'ump45',
            name: 'UMP45 冲锋枪',
            damage: 28,
            fireRate: 600,
            optimalRange: 22,
            rangeFalloff: 0.01,
            recoil: 0.02,
            stability: 0.85,
            magSize: 25,
            reserveAmmo: 150,
            reloadTime: 2.3,
            spread: 0.02,
            pros: ['伤害较高', '平衡性好'],
            cons: ['射速一般', '弹匣较小']
        },
        {
            id: 'p90',
            name: 'P90 冲锋枪',
            damage: 20,
            fireRate: 900,
            optimalRange: 20,
            rangeFalloff: 0.015,
            recoil: 0.012,
            stability: 0.95,
            magSize: 50,
            reserveAmmo: 150,
            reloadTime: 2.5,
            spread: 0.03,
            pros: ['弹匣大', '射速极快', '稳定性最佳'],
            cons: ['伤害最低', '远距离衰减严重']
        }
    ],
    dmr: [
        {
            id: 'sks',
            name: 'SKS 精确射手步枪',
            damage: 55,
            fireRate: 350,
            optimalRange: 85,
            rangeFalloff: 0.002,
            recoil: 0.06,
            stability: 0.6,
            magSize: 10,
            reserveAmmo: 60,
            reloadTime: 3.0,
            spread: 0.008,
            pros: ['伤害高', '精度好'],
            cons: ['射速慢', '弹匣小']
        },
        {
            id: 'mini14',
            name: 'Mini-14 精确射手步枪',
            damage: 45,
            fireRate: 450,
            optimalRange: 80,
            rangeFalloff: 0.0025,
            recoil: 0.04,
            stability: 0.75,
            magSize: 20,
            reserveAmmo: 80,
            reloadTime: 2.5,
            spread: 0.01,
            pros: ['射速快', '弹匣大'],
            cons: ['伤害一般', '后坐力明显']
        },
        {
            id: 'mk14',
            name: 'Mk14 EBR 精确射手步枪',
            damage: 65,
            fireRate: 300,
            optimalRange: 95,
            rangeFalloff: 0.0015,
            recoil: 0.08,
            stability: 0.5,
            magSize: 10,
            reserveAmmo: 50,
            reloadTime: 3.5,
            spread: 0.005,
            pros: ['伤害最高', '射程最远', '精度最高'],
            cons: ['后坐力最大', '弹匣最小', '射速最慢']
        }
    ]
};

const SCOPES = [
    { id: 'iron', name: '机械瞄具', zoom: 1, accuracy: 1 },
    { id: 'redpoint', name: '红点瞄准镜', zoom: 1.5, accuracy: 1.2 },
    { id: 'holo', name: '全息瞄准镜', zoom: 1.5, accuracy: 1.3 },
    { id: 'acog', name: 'ACOG 4x', zoom: 4, accuracy: 1.5 },
    { id: 'scope8x', name: '8x 瞄准镜', zoom: 8, accuracy: 2.0 }
];

class ShootingGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.clock = new THREE.Clock();
        
        this.player = {
            position: new THREE.Vector3(0, 1.7, 0),
            velocity: new THREE.Vector3(),
            rotation: { x: 0, y: 0 },
            health: 100,
            maxHealth: 100,
            speed: 5,
            isMoving: false
        };
        
        this.weapons = WEAPONS;
        this.scopes = SCOPES;
        this.currentWeapon = null;
        this.currentScope = SCOPES[0];
        this.currentAmmo = 0;
        this.reserveAmmo = 0;
        this.isReloading = false;
        this.lastFireTime = 0;
        this.recoilRecovery = 0;
        this.reloadAnimationProgress = 0;
        
        this.targets = [];
        this.targetHealth = 100;
        this.obstacles = [];
        
        this.score = 0;
        this.kills = 0;
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, down: false };
        this.isPointerLocked = false;
        this.isAiming = false;
        this.isGameStarted = false;
        this.isPaused = false;
        this.isInWeaponSelect = true;
        this.isResuming = false;
        this.isHealing = false;
        this.healAccumulator = 0;
        
        this.hasChest = false;
        this.chest = null;
        this.extractionPoint = null;
        this.extractionMarker = null;
        this.isInExtractionZone = false;
        
        this.mouseSensitivity = 0.001;
        
        this.raycaster = new THREE.Raycaster();
        
        this.weaponModel = null;
        this.weaponContainer = new THREE.Group();
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupLights();
        this.createEnvironment();
        this.setupEventListeners();
        this.renderWeaponSelect();
        this.animate();
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x4a6741);
        this.scene.fog = new THREE.FogExp2(0x4a6741, 0.008);
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.copy(this.player.position);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('game-container').appendChild(this.renderer.domElement);
        
        this.camera.add(this.weaponContainer);
        this.scene.add(this.camera);
    }
    
    setupLights() {
        const ambientLight = new THREE.AmbientLight(0x6b8e6b, 0.5);
        this.scene.add(ambientLight);
        
        const sunLight = new THREE.DirectionalLight(0xfff5e0, 1.0);
        sunLight.position.set(100, 150, 50);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 0.5;
        sunLight.shadow.camera.far = 500;
        sunLight.shadow.camera.left = -150;
        sunLight.shadow.camera.right = 150;
        sunLight.shadow.camera.top = 150;
        sunLight.shadow.camera.bottom = -150;
        this.scene.add(sunLight);
        
        const fillLight = new THREE.DirectionalLight(0x88aaff, 0.3);
        fillLight.position.set(-50, 50, -50);
        this.scene.add(fillLight);
    }
    
    createEnvironment() {
        this.createGround();
        this.createForest();
        this.createHills();
        this.createPlayerModel();
        this.createChest();
        this.createExtractionPoint();
    }
    
    createGround() {
        this.groundGeometry = new THREE.PlaneGeometry(200, 200, 100, 100);
        const positions = this.groundGeometry.attributes.position.array;
        
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const distFromCenter = Math.sqrt(x * x + y * y);

            let height = 0;
            height += Math.sin(x * 0.02) * Math.cos(y * 0.02) * 4;
            height += Math.sin(x * 0.05 + 1) * Math.cos(y * 0.04) * 2;
            height += Math.sin(x * 0.08 + 2) * Math.cos(y * 0.07) * 1.5;
            height += Math.sin(x * 0.15) * Math.cos(y * 0.12) * 0.8;
            height += (Math.random() - 0.5) * 0.5;

            if (distFromCenter < 20) {
                height *= distFromCenter / 20;
            }

            positions[i + 1] = height;
        }
        this.groundGeometry.computeVertexNormals();
        
        const groundMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d5c3d,
            roughness: 0.9,
            flatShading: true
        });
        this.groundMesh = new THREE.Mesh(this.groundGeometry, groundMaterial);
        this.groundMesh.rotation.x = -Math.PI / 2;
        this.groundMesh.receiveShadow = true;
        this.groundMesh.name = 'ground';
        this.scene.add(this.groundMesh);
        
        for (let i = 0; i < 500; i++) {
            const x = (Math.random() - 0.5) * 190;
            const z = (Math.random() - 0.5) * 190;
            this.createGrassPatch(x, z);
        }
    }
    
    createHills() {
        const hillPositions = [
            { x: -50, z: -60, radius: 12, height: 4 },
            { x: 60, z: -80, radius: 15, height: 5 },
            { x: -40, z: -70, radius: 10, height: 3.5 },
            { x: 70, z: 50, radius: 14, height: 4.5 },
            { x: -65, z: 40, radius: 11, height: 3.5 },
            { x: 30, z: 70, radius: 13, height: 4 },
            { x: -80, z: -20, radius: 10, height: 3 },
            { x: 80, z: 10, radius: 12, height: 3.5 }
        ];
        
        hillPositions.forEach(hill => {
            this.createHill(hill.x, hill.z, hill.radius, hill.height);
        });
    }
    
    createHill(x, z, radius, height) {
        const hillGeometry = new THREE.ConeGeometry(radius, height, 12, 4);
        const positions = hillGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * radius * 0.15;
            positions[i + 1] += (Math.random() - 0.5) * height * 0.1;
            positions[i + 2] += (Math.random() - 0.5) * radius * 0.15;
        }
        hillGeometry.computeVertexNormals();
        
        const hillMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.25 + Math.random() * 0.05, 0.5, 0.25 + Math.random() * 0.1),
            roughness: 0.9,
            flatShading: true
        });
        const hill = new THREE.Mesh(hillGeometry, hillMaterial);
        const terrainHeight = this.getTerrainHeight(x, z);
        hill.position.set(x, terrainHeight + height / 2 - 0.5, z);
        hill.castShadow = true;
        hill.receiveShadow = true;
        hill.userData.isObstacle = true;
        hill.userData.radius = radius * 0.8;
        this.scene.add(hill);
        this.obstacles.push(hill);
    }
    
    createPlayerModel() {
        this.playerModel = new THREE.Group();
        
        const bodyGeometry = new THREE.CylinderGeometry(0.25, 0.3, 1.2, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2d4a2d,
            roughness: 0.8
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.8;
        body.castShadow = true;
        this.playerModel.add(body);
        
        const headGeometry = new THREE.SphereGeometry(0.25, 8, 8);
        const headMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd4a574,
            roughness: 0.7
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.55;
        head.castShadow = true;
        this.playerModel.add(head);
        
        const helmetGeometry = new THREE.SphereGeometry(0.28, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const helmetMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3d3d3d,
            roughness: 0.5
        });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.y = 1.6;
        helmet.castShadow = true;
        this.playerModel.add(helmet);
        
        const vestGeometry = new THREE.BoxGeometry(0.55, 0.6, 0.35);
        const vestMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a5d23,
            roughness: 0.8
        });
        const vest = new THREE.Mesh(vestGeometry, vestMaterial);
        vest.position.y = 1.1;
        vest.castShadow = true;
        this.playerModel.add(vest);
        
        this.playerModel.position.copy(this.player.position);
        this.scene.add(this.playerModel);
    }
    
    getTerrainHeight(x, z) {
        if (!this.groundGeometry) return 0;
        
        const positions = this.groundGeometry.attributes.position.array;
        const segmentsX = this.groundGeometry.parameters.widthSegments;
        const segmentsY = this.groundGeometry.parameters.heightSegments;
        const width = this.groundGeometry.parameters.width;
        const height = this.groundGeometry.parameters.height;
        
        const gridX = ((x + width / 2) / width) * segmentsX;
        const gridZ = ((z + height / 2) / height) * segmentsY;
        
        const x0 = Math.floor(gridX);
        const z0 = Math.floor(gridZ);
        const x1 = Math.min(x0 + 1, segmentsX);
        const z1 = Math.min(z0 + 1, segmentsY);
        
        const fx = gridX - x0;
        const fz = gridZ - z0;
        
        const getHeight = (gx, gz) => {
            const idx = (gz * (segmentsX + 1) + gx) * 3 + 1;
            if (idx >= 0 && idx < positions.length) {
                return positions[idx];
            }
            return 0;
        };
        
        const h00 = getHeight(x0, z0);
        const h10 = getHeight(x1, z0);
        const h01 = getHeight(x0, z1);
        const h11 = getHeight(x1, z1);
        
        const h0 = h00 * (1 - fx) + h10 * fx;
        const h1 = h01 * (1 - fx) + h11 * fx;
        
        return h0 * (1 - fz) + h1 * fz;
    }
    
    createGrassPatch(x, z) {
        const grassGroup = new THREE.Group();
        const bladeCount = 3 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < bladeCount; i++) {
            const height = 0.2 + Math.random() * 0.3;
            const geometry = new THREE.ConeGeometry(0.02, height, 4);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.25 + Math.random() * 0.05, 0.6, 0.3 + Math.random() * 0.1),
                flatShading: true
            });
            const blade = new THREE.Mesh(geometry, material);
            blade.position.set(
                (Math.random() - 0.5) * 0.2,
                height / 2,
                (Math.random() - 0.5) * 0.2
            );
            blade.rotation.x = (Math.random() - 0.5) * 0.3;
            blade.rotation.z = (Math.random() - 0.5) * 0.3;
            grassGroup.add(blade);
        }
        
        const terrainHeight = this.getTerrainHeight(x, z);
        grassGroup.position.set(x, terrainHeight, z);
        this.scene.add(grassGroup);
    }
    
    createForest() {
        const treePositions = [];
        for (let i = 0; i < 120; i++) {
            let x, z;
            let validPosition = false;
            let attempts = 0;
            
            while (!validPosition && attempts < 20) {
                x = (Math.random() - 0.5) * 180;
                z = (Math.random() - 0.5) * 180;
                
                if (Math.abs(x) > 10 || Math.abs(z) > 10) {
                    validPosition = true;
                    for (const pos of treePositions) {
                        const dist = Math.sqrt((x - pos.x) ** 2 + (z - pos.z) ** 2);
                        if (dist < 5) {
                            validPosition = false;
                            break;
                        }
                    }
                }
                attempts++;
            }
            
            if (validPosition) {
                treePositions.push({ x, z });
                const treeType = Math.random();
                if (treeType < 0.5) {
                    this.createPineTree(x, z);
                } else if (treeType < 0.8) {
                    this.createOakTree(x, z);
                } else {
                    this.createBirchTree(x, z);
                }
            }
        }
        
        for (let i = 0; i < 60; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            if (Math.abs(x) > 5 || Math.abs(z) > 5) {
                this.createBush(x, z);
            }
        }
        
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            if (Math.abs(x) > 5 || Math.abs(z) > 5) {
                this.createRock(x, z);
            }
        }
        
        for (let i = 0; i < 15; i++) {
            const x = (Math.random() - 0.5) * 160;
            const z = (Math.random() - 0.5) * 160;
            if (Math.abs(x) > 10 || Math.abs(z) > 10) {
                this.createFallenLog(x, z);
            }
        }
        
        for (let i = 0; i < 20; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            if (Math.abs(x) > 15 || Math.abs(z) > 15) {
                this.createLargeRock(x, z);
            }
        }
        
        for (let i = 0; i < 12; i++) {
            const x = (Math.random() - 0.5) * 170;
            const z = (Math.random() - 0.5) * 170;
            if (Math.abs(x) > 15 || Math.abs(z) > 15) {
                this.createWallBunker(x, z);
            }
        }
        
        for (let i = 0; i < 20; i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            if (Math.abs(x) > 5 || Math.abs(z) > 5) {
                this.createMushroom(x, z);
            }
        }
        
        for (let i = 0; i < 25;i++) {
            const x = (Math.random() - 0.5) * 180;
            const z = (Math.random() - 0.5) * 180;
            if (Math.abs(x) > 5 || Math.abs(z) > 5) {
                this.createFlower(x, z);
            }
        }
        
        for (let i = 0; i < 5; i++) {
            const x = (Math.random() - 0.5) * 160;
            const z = (Math.random() - 0.5) * 160;
            if (Math.abs(x) > 15 || Math.abs(z) > 15) {
                this.createLargeRock(x, z);
            }
        }
    }
    
    createPineTree(x, z) {
        const tree = new THREE.Group();
        const trunkHeight = 3 + Math.random() * 2;
        const trunkRadius = 0.2 + Math.random() * 0.1;
        
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a3728,
            roughness: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);
        
        const layers = 4 + Math.floor(Math.random() * 2);
        for (let i = 0; i < layers; i++) {
            const layerHeight = 2 + Math.random() * 1;
            const layerRadius = (layers - i) * 0.8 + Math.random() * 0.3;
            const geometry = new THREE.ConeGeometry(layerRadius, layerHeight, 8);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.28 + Math.random() * 0.04, 0.7, 0.25 + Math.random() * 0.1),
                flatShading: true
            });
            const layer = new THREE.Mesh(geometry, material);
            layer.position.y = trunkHeight + i * 1.2;
            layer.castShadow = true;
            layer.receiveShadow = true;
            tree.add(layer);
        }
        
        tree.position.set(x, 0, z);
        tree.rotation.y = Math.random() * Math.PI * 2;
        tree.userData.isObstacle = true;
        tree.userData.radius = trunkRadius * 2;
        const terrainHeight = this.getTerrainHeight(x, z);
        tree.position.y = terrainHeight;
        this.scene.add(tree);
        this.obstacles.push(tree);
    }
    
    createOakTree(x, z) {
        const tree = new THREE.Group();
        const trunkHeight = 4 + Math.random() * 2;
        const trunkRadius = 0.3 + Math.random() * 0.2;
        
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.6, trunkRadius, trunkHeight, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x5c4033,
            roughness: 0.9
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);
        
        const foliageRadius = 2.5 + Math.random() * 1.5;
        const foliageGeometry = new THREE.IcosahedronGeometry(foliageRadius, 1);
        const foliageMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.22 + Math.random() * 0.06, 0.6, 0.3 + Math.random() * 0.1),
            flatShading: true
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + foliageRadius * 0.7;
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        tree.add(foliage);
        
        tree.position.set(x, 0, z);
        tree.rotation.y = Math.random() * Math.PI * 2;
        tree.userData.isObstacle = true;
        tree.userData.radius = trunkRadius * 2;
        const terrainHeight = this.getTerrainHeight(x, z);
        tree.position.y = terrainHeight;
        this.scene.add(tree);
        this.obstacles.push(tree);
    }
    
    createBirchTree(x, z) {
        const tree = new THREE.Group();
        const trunkHeight = 5 + Math.random() * 3;
        const trunkRadius = 0.15 + Math.random() * 0.1;
        
        const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 8);
        const trunkMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf5f5dc,
            roughness: 0.8
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = trunkHeight / 2;
        trunk.castShadow = true;
        trunk.receiveShadow = true;
        tree.add(trunk);
        
        for (let i = 0; i < 5; i++) {
            const markGeometry = new THREE.BoxGeometry(trunkRadius * 2.5, 0.1, 0.05);
            const markMaterial = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
            const mark = new THREE.Mesh(markGeometry, markMaterial);
            mark.position.y = trunkHeight * (0.2 + i * 0.15);
            mark.rotation.y = Math.random() * Math.PI * 2;
            tree.add(mark);
        }
        
        const foliageRadius = 1.5 + Math.random() * 1;
        const foliageGeometry = new THREE.IcosahedronGeometry(foliageRadius, 1);
        const foliageMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0.25 + Math.random() * 0.05, 0.5, 0.4 + Math.random() * 0.1),
            flatShading: true
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight + foliageRadius * 0.5;
        foliage.castShadow = true;
        foliage.receiveShadow = true;
        tree.add(foliage);
        
        tree.position.set(x, 0, z);
        tree.rotation.y = Math.random() * Math.PI * 2;
        tree.userData.isObstacle = true;
        tree.userData.radius = trunkRadius * 2;
        const terrainHeight = this.getTerrainHeight(x, z);
        tree.position.y = terrainHeight;
        this.scene.add(tree);
        this.obstacles.push(tree);
    }
    
    createBush(x, z) {
        const bush = new THREE.Group();
        const bushSize = 0.5 + Math.random() * 0.8;
        const bushCount = 2 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < bushCount; i++) {
            const geometry = new THREE.IcosahedronGeometry(bushSize * (0.5 + Math.random() * 0.5), 0);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0.28 + Math.random() * 0.08, 0.6, 0.25 + Math.random() * 0.15),
                flatShading: true
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(
                (Math.random() - 0.5) * bushSize,
                bushSize * 0.5 + Math.random() * 0.3,
                (Math.random() - 0.5) * bushSize
            );
            sphere.castShadow = true;
            sphere.receiveShadow = true;
            bush.add(sphere);
        }
        
        const terrainHeight = this.getTerrainHeight(x, z);
        bush.position.set(x, terrainHeight, z);
        bush.userData.isObstacle = true;
        bush.userData.radius = bushSize * 0.5;
        this.scene.add(bush);
        this.obstacles.push(bush);
    }
    
    createRock(x, z) {
        const rockSize = 0.3 + Math.random() * 1.2;
        const geometry = new THREE.DodecahedronGeometry(rockSize, 0);
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0, 0, 0.3 + Math.random() * 0.2),
            roughness: 0.9,
            flatShading: true
        });
        const rock = new THREE.Mesh(geometry, material);
        const terrainHeight = this.getTerrainHeight(x, z);
        rock.position.set(x, terrainHeight + rockSize * 0.4, z);
        rock.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        rock.scale.set(
            1 + Math.random() * 0.5,
            0.5 + Math.random() * 0.5,
            1 + Math.random() * 0.5
        );
        rock.castShadow = true;
        rock.receiveShadow = true;
        
        if (rockSize > 0.8) {
            rock.userData.isObstacle = true;
            rock.userData.radius = rockSize * 0.7;
            this.obstacles.push(rock);
        }
        
        this.scene.add(rock);
    }
    
    createLargeRock(x, z) {
        const rockGroup = new THREE.Group();
        const mainSize = 2 + Math.random() * 2;
        
        const mainGeometry = new THREE.DodecahedronGeometry(mainSize, 1);
        const positions = mainGeometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * mainSize * 0.3;
            positions[i + 1] += (Math.random() - 0.5) * mainSize * 0.3;
            positions[i + 2] += (Math.random() - 0.5) * mainSize * 0.3;
        }
        mainGeometry.computeVertexNormals();
        
        const mainMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color().setHSL(0, 0, 0.35 + Math.random() * 0.1),
            roughness: 0.9,
            flatShading: true
        });
        const mainRock = new THREE.Mesh(mainGeometry, mainMaterial);
        mainRock.position.y = mainSize * 0.3;
        mainRock.castShadow = true;
        mainRock.receiveShadow = true;
        rockGroup.add(mainRock);
        
        const smallRockCount = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < smallRockCount; i++) {
            const smallSize = 0.5 + Math.random() * 0.8;
            const smallGeometry = new THREE.DodecahedronGeometry(smallSize, 0);
            const smallMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0, 0, 0.3 + Math.random() * 0.15),
                roughness: 0.9,
                flatShading: true
            });
            const smallRock = new THREE.Mesh(smallGeometry, smallMaterial);
            smallRock.position.set(
                (Math.random() - 0.5) * mainSize * 1.5,
                smallSize * 0.3,
                (Math.random() - 0.5) * mainSize * 1.5
            );
            smallRock.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );
            smallRock.castShadow = true;
            smallRock.receiveShadow = true;
            rockGroup.add(smallRock);
        }
        
        rockGroup.position.set(x, 0, z);
        rockGroup.userData.isObstacle = true;
        rockGroup.userData.radius = mainSize * 1.2;
        const terrainHeight = this.getTerrainHeight(x, z);
        rockGroup.position.y = terrainHeight;
        this.scene.add(rockGroup);
        this.obstacles.push(rockGroup);
    }
    
    createFallenLog(x, z) {
        const log = new THREE.Group();
        const length = 2 + Math.random() * 3;
        const radius = 0.2 + Math.random() * 0.2;
        
        const geometry = new THREE.CylinderGeometry(radius * 0.8, radius, length, 8);
        const material = new THREE.MeshStandardMaterial({
            color: 0x5c4033,
            roughness: 0.9
        });
        const logMesh = new THREE.Mesh(geometry, material);
        logMesh.rotation.z = Math.PI / 2;
        logMesh.position.y = radius * 0.5;
        logMesh.castShadow = true;
        logMesh.receiveShadow = true;
        log.add(logMesh);
        
        const stumpGeometry = new THREE.CylinderGeometry(radius * 1.2, radius * 1.5, 0.3, 8);
        const stump = new THREE.Mesh(stumpGeometry, material);
        stump.position.set(length / 2, radius * 0.3, 0);
        stump.castShadow = true;
        log.add(stump);
        
        log.position.set(x, 0, z);
        log.rotation.y = Math.random() * Math.PI * 2;
        log.userData.isObstacle = true;
        log.userData.radius = radius * 2;
        const terrainHeight = this.getTerrainHeight(x, z);
        log.position.y = terrainHeight;
        this.scene.add(log);
        this.obstacles.push(log);
    }
    
    createWallBunker(x, z) {
        const bunker = new THREE.Group();
        const width = 4 + Math.random() * 3;
        const height = 1.5 + Math.random() * 1;
        const depth = 0.8 + Math.random() * 0.5;
        
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            roughness: 0.95,
            flatShading: true
        });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.y = height / 2;
        wall.castShadow = true;
        wall.receiveShadow = true;
        bunker.add(wall);
        
        const detailCount = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < detailCount; i++) {
            const detailSize = 0.3 + Math.random() * 0.5;
            const detailGeometry = new THREE.BoxGeometry(detailSize, detailSize, detailSize * 0.5);
            const detailMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color().setHSL(0, 0, 0.25 + Math.random() * 0.15),
                roughness: 0.9
            });
            const detail = new THREE.Mesh(detailGeometry, detailMaterial);
            detail.position.set(
                (Math.random() - 0.5) * width * 0.8,
                height * 0.5 + Math.random() * height * 0.3,
                depth * 0.5
            );
            detail.castShadow = true;
            bunker.add(detail);
        }
        
        bunker.position.set(x, 0, z);
        bunker.rotation.y = Math.random() * Math.PI * 2;
        bunker.userData.isObstacle = true;
        bunker.userData.radius = width * 0.6;
        const terrainHeight = this.getTerrainHeight(x, z);
        bunker.position.y = terrainHeight;
        this.scene.add(bunker);
        this.obstacles.push(bunker);
    }
    
    createMushroom(x, z) {
        const mushroom = new THREE.Group();
        const stemHeight = 0.15 + Math.random() * 0.15;
        const capRadius = 0.08 + Math.random() * 0.08;
        
        const stemGeometry = new THREE.CylinderGeometry(capRadius * 0.4, capRadius * 0.5, stemHeight, 6);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.y = stemHeight / 2;
        mushroom.add(stem);
        
        const capGeometry = new THREE.SphereGeometry(capRadius, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
        const capColor = Math.random() > 0.5 ? 0xcc3333 : 0x8b4513;
        const capMaterial = new THREE.MeshStandardMaterial({ color: capColor });
        const cap = new THREE.Mesh(capGeometry, capMaterial);
        cap.position.y = stemHeight;
        mushroom.add(cap);
        
        mushroom.position.set(x, 0, z);
        const terrainHeight = this.getTerrainHeight(x, z);
        mushroom.position.y = terrainHeight;
        this.scene.add(mushroom);
    }
    
    createFlower(x, z) {
        const flower = new THREE.Group();
        
        const stemGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 4);
        const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
        const stem = new THREE.Mesh(stemGeometry, stemMaterial);
        stem.position.y = 0.1;
        flower.add(stem);
        
        const petalCount = 5 + Math.floor(Math.random() * 3);
        const petalColor = [0xff69b4, 0xffff00, 0xff6347, 0x9370db, 0xffffff][Math.floor(Math.random() * 5)];
        
        for (let i = 0; i < petalCount; i++) {
            const petalGeometry = new THREE.SphereGeometry(0.03, 4, 4);
            const petalMaterial = new THREE.MeshStandardMaterial({ color: petalColor });
            const petal = new THREE.Mesh(petalGeometry, petalMaterial);
            const angle = (i / petalCount) * Math.PI * 2;
            petal.position.set(
                Math.cos(angle) * 0.04,
                0.2,
                Math.sin(angle) * 0.04
            );
            flower.add(petal);
        }
        
        const centerGeometry = new THREE.SphereGeometry(0.02, 6, 6);
        const centerMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700 });
        const center = new THREE.Mesh(centerGeometry, centerMaterial);
        center.position.y = 0.2;
        flower.add(center);
        
        flower.position.set(x, 0, z);
        const terrainHeight = this.getTerrainHeight(x, z);
        flower.position.y = terrainHeight;
        this.scene.add(flower);
    }
    
    createChest() {
        const chest = new THREE.Group();
        
        const bodyGeometry = new THREE.BoxGeometry(0.8, 0.5, 0.5);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B4513,
            roughness: 0.8
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.25;
        body.castShadow = true;
        chest.add(body);
        
        const lidGeometry = new THREE.BoxGeometry(0.85, 0.1, 0.55);
        const lid = new THREE.Mesh(lidGeometry, bodyMaterial);
        lid.position.y = 0.55;
        lid.castShadow = true;
        chest.add(lid);
        
        const bandGeometry = new THREE.BoxGeometry(0.82, 0.08, 0.52);
        const bandMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 0.8,
            roughness: 0.2
        });
        const band1 = new THREE.Mesh(bandGeometry, bandMaterial);
        band1.position.y = 0.15;
        chest.add(band1);
        
        const band2 = new THREE.Mesh(bandGeometry, bandMaterial);
        band2.position.y = 0.35;
        chest.add(band2);
        
        const lockGeometry = new THREE.BoxGeometry(0.1, 0.15, 0.08);
        const lock = new THREE.Mesh(lockGeometry, bandMaterial);
        lock.position.set(0, 0.5, 0.28);
        chest.add(lock);
        
        const glowGeometry = new THREE.SphereGeometry(1.5, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xFFD700,
            transparent: true,
            opacity: 0.15
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.y = 0.3;
        chest.add(glow);
        
        chest.position.set(0, 0, 0);
        const terrainHeight = this.getTerrainHeight(0, 0);
        chest.position.y = terrainHeight;
        
        this.chest = chest;
        this.scene.add(chest);
    }
    
    createExtractionPoint() {
        const edges = [
            { x: -95, z: 0 },
            { x: 95, z: 0 },
            { x: 0, z: -95 },
            { x: 0, z: 95 }
        ];
        
        const edge = edges[Math.floor(Math.random() * edges.length)];
        
        const extraction = new THREE.Group();
        
        const platformGeometry = new THREE.CylinderGeometry(3, 3, 0.2, 32);
        const platformMaterial = new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00,
            emissiveIntensity: 0.3
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        extraction.add(platform);
        
        const ringGeometry = new THREE.TorusGeometry(3, 0.1, 8, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = 0.1;
        extraction.add(ring);
        
        for (let i = 0; i < 4; i++) {
            const pillarGeometry = new THREE.CylinderGeometry(0.15, 0.15, 4, 8);
            const pillarMaterial = new THREE.MeshStandardMaterial({
                color: 0x00ff00,
                emissive: 0x00ff00,
                emissiveIntensity: 0.5
            });
            const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
            const angle = (i / 4) * Math.PI * 2;
            pillar.position.set(
                Math.cos(angle) * 2.5,
                2,
                Math.sin(angle) * 2.5
            );
            extraction.add(pillar);
        }
        
        const beaconGeometry = new THREE.CylinderGeometry(0.5, 0.5, 50, 8);
        const beaconMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.2
        });
        const beacon = new THREE.Mesh(beaconGeometry, beaconMaterial);
        beacon.position.y = 25;
        extraction.add(beacon);
        
        const terrainHeight = this.getTerrainHeight(edge.x, edge.z);
        extraction.position.set(edge.x, terrainHeight, edge.z);
        
        this.extractionPoint = extraction;
        this.scene.add(extraction);
        
        this.createExtractionMarker();
    }
    
    createExtractionMarker() {
        const marker = document.createElement('div');
        marker.id = 'extraction-marker';
        marker.innerHTML = '⬇ 撤离点';
        marker.style.cssText = `
            position: fixed;
            color: #00ff00;
            font-size: 16px;
            font-weight: bold;
            text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00;
            pointer-events: none;
            z-index: 100;
            display: none;
        `;
        document.body.appendChild(marker);
        this.extractionMarker = marker;
    }
    
    updateExtractionMarker() {
        if (!this.extractionMarker || !this.extractionPoint) return;
        
        const extractionPos = this.extractionPoint.position.clone();
        extractionPos.y += 3;
        
        const screenPos = extractionPos.clone().project(this.camera);
        
        const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;
        
        if (screenPos.z < 1) {
            this.extractionMarker.style.display = 'block';
            this.extractionMarker.style.left = x + 'px';
            this.extractionMarker.style.top = y + 'px';
            this.extractionMarker.style.transform = 'translate(-50%, -50%)';
        } else {
            this.extractionMarker.style.display = 'none';
        }
    }
    
    createWeaponModel(weaponId) {
        if (this.weaponModel) {
            this.weaponContainer.remove(this.weaponModel);
        }
        
        const weaponGroup = new THREE.Group();
        
        if (weaponId === 'ak47') {
            this.createAK47Model(weaponGroup);
        } else if (weaponId === 'm4a1') {
            this.createM4A1Model(weaponGroup);
        } else if (weaponId === 'scarh') {
            this.createSCARHModel(weaponGroup);
        } else if (weaponId === 'mp5') {
            this.createMP5Model(weaponGroup);
        } else if (weaponId === 'ump45') {
            this.createUMP45Model(weaponGroup);
        } else if (weaponId === 'p90') {
            this.createP90Model(weaponGroup);
        } else if (weaponId === 'sks') {
            this.createSKSModel(weaponGroup);
        } else if (weaponId === 'mini14') {
            this.createMini14Model(weaponGroup);
        } else if (weaponId === 'mk14') {
            this.createMk14Model(weaponGroup);
        }
        
        this.weaponModel = weaponGroup;
        this.weaponContainer.add(weaponGroup);
        this.updateWeaponPosition();
    }
    
    createAK47Model(group) {
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.6 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.8 });
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.35), metalMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.4);
        group.add(barrel);
        
        const gasTube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8), metalMat);
        gasTube.rotation.x = Math.PI / 2;
        gasTube.position.set(0, 0.035, -0.25);
        group.add(gasTube);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.06, 0.22), woodMat);
        handguard.position.set(0, -0.01, -0.22);
        group.add(handguard);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.2), woodMat);
        stock.position.set(0, -0.02, 0.22);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.1, 0.06), woodMat);
        stockButt.position.set(0, -0.03, 0.35);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.1, 0.04), woodMat);
        pistolGrip.position.set(0, -0.08, 0.08);
        pistolGrip.rotation.x = 0.3;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.12, 0.06), blackMat);
        mag.position.set(0, -0.1, 0);
        mag.rotation.x = 0.15;
        group.add(mag);
        
        const dustCover = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.02, 0.2), metalMat);
        dustCover.position.set(0, 0.05, -0.05);
        group.add(dustCover);
    }
    
    createM4A1Model(group) {
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.7 });
        const tanMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.6 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.07, 0.3), blackMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.4, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.38);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.035, 0.25, 8), tanMat);
        handguard.rotation.x = Math.PI / 2;
        handguard.position.set(0, 0, -0.2);
        group.add(handguard);
        
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.015, 0.28), metalMat);
        rail.position.set(0, 0.045, -0.1);
        group.add(rail);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.05, 0.18), blackMat);
        stock.position.set(0, 0, 0.22);
        group.add(stock);
        
        const stockBuffer = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8), metalMat);
        stockBuffer.rotation.x = Math.PI / 2;
        stockBuffer.position.set(0, 0, 0.15);
        group.add(stockBuffer);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.08, 0.035), blackMat);
        pistolGrip.position.set(0, -0.06, 0.08);
        pistolGrip.rotation.x = 0.25;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.1, 0.05), blackMat);
        mag.position.set(0, -0.08, 0);
        group.add(mag);
        
        const carryHandle = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.03, 0.12), blackMat);
        carryHandle.position.set(0, 0.05, 0.02);
        group.add(carryHandle);
        
        const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.04, 0.015), blackMat);
        frontSight.position.set(0, 0.06, -0.3);
        group.add(frontSight);
    }
    
    createSCARHModel(group) {
        const tanMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.5 });
        const darkMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.3, metalness: 0.6 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.32), tanMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.35, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.38);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.055, 0.22), tanMat);
        handguard.position.set(0, 0, -0.2);
        group.add(handguard);
        
        const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.012, 0.35), darkMat);
        topRail.position.set(0, 0.048, -0.02);
        group.add(topRail);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.06, 0.15), tanMat);
        stock.position.set(0, 0, 0.22);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.08, 0.04), tanMat);
        stockButt.position.set(0, -0.01, 0.32);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.08, 0.035), tanMat);
        pistolGrip.position.set(0, -0.06, 0.08);
        pistolGrip.rotation.x = 0.25;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.09, 0.055), darkMat);
        mag.position.set(0, -0.075, 0);
        group.add(mag);
    }
    
    createMP5Model(group) {
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.7 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.06, 0.28), blackMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.25, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.28);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, 0.15), blackMat);
        handguard.position.set(0, -0.005, -0.15);
        group.add(handguard);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.2), blackMat);
        stock.position.set(0, 0, 0.2);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.06, 0.03), blackMat);
        stockButt.position.set(0, -0.01, 0.32);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.07, 0.03), blackMat);
        pistolGrip.position.set(0, -0.055, 0.06);
        pistolGrip.rotation.x = 0.3;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.08, 0.035), blackMat);
        mag.position.set(0, -0.065, 0);
        group.add(mag);
        
        const cockingHandle = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.025, 0.04), metalMat);
        cockingHandle.position.set(0, 0.045, -0.05);
        group.add(cockingHandle);
    }
    
    createUMP45Model(group) {
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const grayMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.3), blackMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.2, 8), grayMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.25);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.12), blackMat);
        handguard.position.set(0, 0, -0.12);
        group.add(handguard);
        
        const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.01, 0.22), grayMat);
        topRail.position.set(0, 0.04, -0.02);
        group.add(topRail);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.18), blackMat);
        stock.position.set(0, 0, 0.2);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.055, 0.03), blackMat);
        stockButt.position.set(0, -0.01, 0.3);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.07, 0.03), blackMat);
        pistolGrip.position.set(0, -0.055, 0.06);
        pistolGrip.rotation.x = 0.25;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.08, 0.04), blackMat);
        mag.position.set(0, -0.065, 0);
        group.add(mag);
    }
    
    createP90Model(group) {
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const grayMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.4 });
        const tanMat = new THREE.MeshStandardMaterial({ color: 0x8B7355, roughness: 0.5 });
        
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.1, 0.35), tanMat);
        body.position.set(0, 0, 0);
        group.add(body);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8), grayMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.02, -0.28);
        group.add(barrel);
        
        const barrelShroud = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8), blackMat);
        barrelShroud.rotation.x = Math.PI / 2;
        barrelShroud.position.set(0, 0.02, -0.23);
        group.add(barrelShroud);
        
        const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.012, 0.2), blackMat);
        topRail.position.set(0, 0.058, -0.05);
        group.add(topRail);
        
        const grip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.08), tanMat);
        grip.position.set(0, -0.06, -0.05);
        group.add(grip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.04, 0.25), blackMat);
        mag.position.set(0, 0.07, 0);
        group.add(mag);
    }
    
    createSKSModel(group) {
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.6 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.4, metalness: 0.7 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.35), metalMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.45);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.25), woodMat);
        handguard.position.set(0, -0.01, -0.25);
        group.add(handguard);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.07, 0.25), woodMat);
        stock.position.set(0, -0.02, 0.2);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.09, 0.05), woodMat);
        stockButt.position.set(0, -0.025, 0.35);
        group.add(stockButt);
        
        const magazine = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.06, 0.05), metalMat);
        magazine.position.set(0, -0.05, 0.02);
        group.add(magazine);
        
        const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.06), metalMat);
        bolt.position.set(0.03, 0.035, 0.1);
        group.add(bolt);
    }
    
    createMini14Model(group) {
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xA0522D, roughness: 0.6 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.4, metalness: 0.6 });
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.065, 0.32), metalMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.42);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.045, 0.2), woodMat);
        handguard.position.set(0, -0.005, -0.2);
        group.add(handguard);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.06, 0.22), woodMat);
        stock.position.set(0, -0.015, 0.2);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.08, 0.04), woodMat);
        stockButt.position.set(0, -0.02, 0.33);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.06, 0.03), woodMat);
        pistolGrip.position.set(0, -0.05, 0.08);
        pistolGrip.rotation.x = 0.25;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.07, 0.04), blackMat);
        mag.position.set(0, -0.06, 0);
        group.add(mag);
    }
    
    createMk14Model(group) {
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.5 });
        const greenMat = new THREE.MeshStandardMaterial({ color: 0x2F4F2F, roughness: 0.5 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.4, metalness: 0.6 });
        
        const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.07, 0.35), blackMat);
        receiver.position.set(0, 0, 0);
        group.add(receiver);
        
        const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.5, 8), metalMat);
        barrel.rotation.x = Math.PI / 2;
        barrel.position.set(0, 0.01, -0.48);
        group.add(barrel);
        
        const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.055, 0.28), greenMat);
        handguard.position.set(0, 0, -0.25);
        group.add(handguard);
        
        const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.012, 0.38), metalMat);
        topRail.position.set(0, 0.043, -0.02);
        group.add(topRail);
        
        const stock = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.05, 0.2), blackMat);
        stock.position.set(0, 0, 0.22);
        group.add(stock);
        
        const stockButt = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.07, 0.04), blackMat);
        stockButt.position.set(0, -0.01, 0.33);
        group.add(stockButt);
        
        const pistolGrip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.07, 0.035), blackMat);
        pistolGrip.position.set(0, -0.055, 0.08);
        pistolGrip.rotation.x = 0.25;
        group.add(pistolGrip);
        
        const mag = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.08, 0.045), blackMat);
        mag.position.set(0, -0.07, 0);
        group.add(mag);
    }
    
    updateWeaponPosition() {
        if (!this.weaponContainer) return;
        
        if (this.isAiming) {
            this.weaponContainer.visible = false;
        } else {
            this.weaponContainer.visible = true;
            this.weaponContainer.position.set(0.15, -0.2, -0.35);
            this.weaponContainer.rotation.set(0, 0.05, 0);
        }
    }
    
    createTarget(position, isMoving = false, moveRange = 0) {
        const group = new THREE.Group();
        
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.6 });
        const clothMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.7 });
        const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
        
        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.3), clothMat);
        torso.position.y = 1.25;
        torso.castShadow = true;
        group.add(torso);
        
        const torsoHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.3), hitboxMat);
        torsoHitbox.position.y = 1.25;
        torsoHitbox.name = 'torso';
        group.add(torsoHitbox);
        
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), skinMat);
        head.position.y = 1.85;
        head.castShadow = true;
        group.add(head);
        
        const headHitbox = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), hitboxMat);
        headHitbox.position.y = 1.85;
        headHitbox.name = 'head';
        group.add(headHitbox);
        
        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.15, 8), skinMat);
        neck.position.y = 1.7;
        group.add(neck);
        
        const leftUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.12), clothMat);
        leftUpperArm.position.set(-0.37, 1.35, 0);
        leftUpperArm.rotation.z = 0.15;
        leftUpperArm.castShadow = true;
        group.add(leftUpperArm);
        
        const leftLowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), skinMat);
        leftLowerArm.position.set(-0.45, 1.0, 0);
        leftLowerArm.rotation.z = 0.1;
        leftLowerArm.castShadow = true;
        group.add(leftLowerArm);
        
        const leftArmHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.7, 0.15), hitboxMat);
        leftArmHitbox.position.set(-0.4, 1.15, 0);
        leftArmHitbox.name = 'leftArm';
        group.add(leftArmHitbox);
        
        const rightUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.35, 0.12), clothMat);
        rightUpperArm.position.set(0.37, 1.35, 0);
        rightUpperArm.rotation.z = -0.15;
        rightUpperArm.castShadow = true;
        group.add(rightUpperArm);
        
        const rightLowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.35, 0.1), skinMat);
        rightLowerArm.position.set(0.45, 1.0, 0);
        rightLowerArm.rotation.z = -0.1;
        rightLowerArm.castShadow = true;
        group.add(rightLowerArm);
        
        const rightArmHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.7, 0.15), hitboxMat);
        rightArmHitbox.position.set(0.4, 1.15, 0);
        rightArmHitbox.name = 'rightArm';
        group.add(rightArmHitbox);
        
        const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.25, 0.25), clothMat);
        pelvis.position.y = 0.8;
        pelvis.castShadow = true;
        group.add(pelvis);
        
        const leftUpperLeg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.45, 0.15), clothMat);
        leftUpperLeg.position.set(-0.13, 0.45, 0);
        leftUpperLeg.castShadow = true;
        group.add(leftUpperLeg);
        
        const leftLowerLeg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), clothMat);
        leftLowerLeg.position.set(-0.13, 0.0, 0);
        leftLowerLeg.castShadow = true;
        group.add(leftLowerLeg);
        
        const leftLegHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.18), hitboxMat);
        leftLegHitbox.position.set(-0.13, 0.22, 0);
        leftLegHitbox.name = 'leftLeg';
        group.add(leftLegHitbox);
        
        const rightUpperLeg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.45, 0.15), clothMat);
        rightUpperLeg.position.set(0.13, 0.45, 0);
        rightUpperLeg.castShadow = true;
        group.add(rightUpperLeg);
        
        const rightLowerLeg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.45, 0.12), clothMat);
        rightLowerLeg.position.set(0.13, 0.0, 0);
        rightLowerLeg.castShadow = true;
        group.add(rightLowerLeg);
        
        const rightLegHitbox = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.9, 0.18), hitboxMat);
        rightLegHitbox.position.set(0.13, 0.22, 0);
        rightLegHitbox.name = 'rightLeg';
        group.add(rightLegHitbox);
        
        group.position.copy(position);
        const terrainHeight = this.getTerrainHeight(position.x, position.z);
        group.position.y = terrainHeight;
        group.userData = {
            health: this.targetHealth,
            maxHealth: this.targetHealth,
            isMoving: isMoving,
            moveRange: moveRange,
            startPosition: position.clone(),
            moveSpeed: 2,
            moveDirection: 1,
            distance: position.length(),
            isDead: false
        };
        
        this.scene.add(group);
        this.targets.push(group);
        
        return group;
    }
    
    spawnTargets() {
        while (this.targets.length > 0) {
            const target = this.targets.pop();
            this.scene.remove(target);
            target.traverse((child) => {
                if (child.geometry) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(m => m.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        }
        
        const enemyPositions = [
            { x: -40, z: -50 },
            { x: 40, z: -60 },
            { x: -25, z: -35 },
            { x: 25, z: -40 },
            { x: -50, z: -30 },
            { x: 50, z: -25 },
            { x: 0, z: -70 },
            { x: -35, z: -80 },
            { x: 60, z: 40 },
            { x: -60, z: 50 },
            { x: 30, z: 60 },
            { x: -45, z: 30 }
        ];
        
        enemyPositions.forEach((pos) => {
            const position = new THREE.Vector3(pos.x, 0, pos.z);
            const isMoving = Math.random() > 0.3;
            const moveRange = isMoving ? 10 + Math.random() * 15 : 0;
            const target = this.createTarget(position, isMoving, moveRange);
            target.userData.moveSpeed = 1 + Math.random() * 2;
            target.userData.shootInterval = 2 + Math.random() * 3;
            target.userData.lastShootTime = Math.random() * 2;
            target.userData.accuracy = 0.7 + Math.random() * 0.2;
            target.userData.enemyDamage = 10 + Math.floor(Math.random() * 10);
            target.userData.isDead = false;
            target.userData.aiState = 'patrol';
            target.userData.lastPatrolTime = 0;
            target.userData.lastCheckCover = 0;
            target.userData.lastStateChange = 0;
            target.userData.patrolDirection = new THREE.Vector3(1, 0, 0);
            target.userData.patrolDuration = 0;
            target.userData.patrolTimer = 0;
            target.userData.searchStartTime = 0;
            target.userData.searchDirection = new THREE.Vector3(1, 0, 0);
            target.userData.coverPosition = null;
            target.userData.team = Math.floor(Math.random() * 3);
            target.userData.targetEnemy = null;
            target.userData.lastTargetSearch = 0;
        });
    }
    
    updateTargets(delta) {
        this.targets.forEach(target => {
            if (target.userData.isDead) return;
            
            if (target.userData.isMoving) {
                const data = target.userData;
                target.position.x += data.moveDirection * data.moveSpeed * delta;
                
                if (Math.abs(target.position.x - data.startPosition.x) > data.moveRange) {
                    data.moveDirection *= -1;
                }
                
                const terrainHeight = this.getTerrainHeight(target.position.x, target.position.z);
                target.position.y = terrainHeight;
            }
            
            if (target.userData.health > 0) {
                this.updateEnemyAI(target, delta);
            }
        });
    }
    
    updateEnemyAI(enemy, delta) {
        if (!this.isGameStarted || this.isPaused) return;
        if (!this.targets.includes(enemy)) return;
        if (enemy.userData.isDead) return;
        
        const data = enemy.userData;
        data.lastShootTime += delta;
        data.lastTargetSearch += delta;
        data.lastPatrolTime += delta;
        data.lastCheckCover += delta;
        
        const directionToPlayer = new THREE.Vector3();
        directionToPlayer.subVectors(this.player.position, enemy.position);
        const distanceToPlayer = directionToPlayer.length();
        
        let target = null;
        let targetDistance = Infinity;
        let targetPosition = null;
        
        this.updateEnemyState(enemy, distanceToPlayer, delta);
        
        switch (data.aiState) {
            case 'patrol':
                this.performPatrol(enemy, delta);
                break;
            case 'search':
                this.performSearch(enemy, delta);
                break;
            case 'attack':
                target = this.player;
                targetDistance = distanceToPlayer;
                targetPosition = this.player.position;
                break;
            case 'cover':
                this.performCover(enemy, delta);
                break;
        }
        
        if (data.lastTargetSearch > 2) {
            data.lastTargetSearch = 0;
            data.targetEnemy = null;
            
            let closestEnemy = null;
            let closestDistance = Infinity;
            
            for (const otherEnemy of this.targets) {
                if (otherEnemy === enemy) continue;
                if (otherEnemy.userData.isDead) continue;
                if (otherEnemy.userData.team === data.team) continue;
                
                const dist = enemy.position.distanceTo(otherEnemy.position);
                if (dist < closestDistance && dist < 80) {
                    closestEnemy = otherEnemy;
                    closestDistance = dist;
                }
            }
            
            if (closestEnemy) {
                data.targetEnemy = closestEnemy;
                target = closestEnemy;
                targetDistance = closestDistance;
                targetPosition = closestEnemy.position;
            }
        }
        
        if (data.targetEnemy && !data.targetEnemy.userData.isDead) {
            const distToEnemy = enemy.position.distanceTo(data.targetEnemy.position);
            if (distToEnemy < 80) {
                if (!target || distToEnemy < targetDistance) {
                    target = data.targetEnemy;
                    targetDistance = distToEnemy;
                    targetPosition = data.targetEnemy.position;
                }
            }
        }
        
        if (target && targetPosition) {
            this.faceTarget(enemy, targetPosition);
            
            if (targetDistance > 5 && target !== this.player) {
                this.moveToTarget(enemy, targetPosition, delta);
            }
            
            if (data.lastShootTime >= data.shootInterval && targetDistance < 200) {
                if (this.hasLineOfSightToTarget(enemy, targetPosition)) {
                    this.enemyShootTarget(enemy, target, targetDistance);
                }
                data.lastShootTime = 0;
            }
        }
    }
    
    updateEnemyState(enemy, distanceToPlayer, delta) {
        const data = enemy.userData;
        
        if (distanceToPlayer < 30) {
            data.aiState = 'attack';
            data.lastStateChange = 0;
        } else if (distanceToPlayer < 80) {
            if (data.aiState !== 'attack' && data.aiState !== 'cover') {
                if (Math.random() > 0.3) {
                    data.aiState = 'attack';
                } else {
                    data.aiState = 'cover';
                }
                data.lastStateChange = 0;
            }
        } else if (distanceToPlayer < 150) {
            if (data.aiState === 'patrol') {
                data.aiState = 'search';
                data.lastStateChange = 0;
                data.searchStartTime = Date.now();
                data.searchDirection = new THREE.Vector3(
                    Math.random() - 0.5,
                    0,
                    Math.random() - 0.5
                ).normalize();
            }
        } else {
            if (data.aiState !== 'patrol') {
                data.aiState = 'patrol';
                data.lastStateChange = 0;
            }
        }
    }
    
    performPatrol(enemy, delta) {
        const data = enemy.userData;
        
        if (data.lastPatrolTime > 3) {
            data.lastPatrolTime = 0;
            data.patrolDirection = new THREE.Vector3(
                Math.random() - 0.5,
                0,
                Math.random() - 0.5
            ).normalize();
            data.patrolDuration = 2 + Math.random() * 3;
            data.patrolTimer = 0;
        }
        
        data.patrolTimer += delta;
        if (data.patrolTimer < data.patrolDuration) {
            const moveSpeed = 2;
            const moveVector = data.patrolDirection.clone().multiplyScalar(moveSpeed * delta);
            
            const newPos = enemy.position.clone().add(moveVector);
            const terrainHeight = this.getTerrainHeight(newPos.x, newPos.z);
            newPos.y = terrainHeight;
            
            if (!this.checkObstacleCollision(newPos)) {
                enemy.position.copy(newPos);
            }
        }
    }
    
    performSearch(enemy, delta) {
        const data = enemy.userData;
        
        if (Date.now() - data.searchStartTime > 10000) {
            data.aiState = 'patrol';
            return;
        }
        
        const moveSpeed = 3.5;
        const moveVector = data.searchDirection.clone().multiplyScalar(moveSpeed * delta);
        
        const newPos = enemy.position.clone().add(moveVector);
        const terrainHeight = this.getTerrainHeight(newPos.x, newPos.z);
        newPos.y = terrainHeight;
        
        if (!this.checkObstacleCollision(newPos)) {
            enemy.position.copy(newPos);
        }
    }
    
    performCover(enemy, delta) {
        const data = enemy.userData;
        
        if (data.lastCheckCover > 1) {
            data.lastCheckCover = 0;
            const coverPosition = this.findCover(enemy);
            if (coverPosition) {
                data.coverPosition = coverPosition;
            }
        }
        
        if (data.coverPosition) {
            const directionToCover = new THREE.Vector3();
            directionToCover.subVectors(data.coverPosition, enemy.position);
            const distanceToCover = directionToCover.length();
            
            if (distanceToCover > 2) {
                const moveSpeed = 4;
                directionToCover.normalize();
                const moveVector = directionToCover.multiplyScalar(moveSpeed * delta);
                
                const newPos = enemy.position.clone().add(moveVector);
                const terrainHeight = this.getTerrainHeight(newPos.x, newPos.z);
                newPos.y = terrainHeight;
                
                if (!this.checkObstacleCollision(newPos)) {
                    enemy.position.copy(newPos);
                }
            }
        }
    }
    
    findCover(enemy) {
        const coverPositions = [];
        const directions = [
            { x: 1, z: 0 },
            { x: -1, z: 0 },
            { x: 0, z: 1 },
            { x: 0, z: -1 },
            { x: 1, z: 1 },
            { x: -1, z: -1 },
            { x: 1, z: -1 },
            { x: -1, z: 1 }
        ];
        
        for (const dir of directions) {
            for (let distance = 2; distance <= 8; distance += 2) {
                const pos = new THREE.Vector3(
                    enemy.position.x + dir.x * distance,
                    0,
                    enemy.position.z + dir.z * distance
                );
                
                const terrainHeight = this.getTerrainHeight(pos.x, pos.z);
                pos.y = terrainHeight;
                
                if (!this.checkObstacleCollision(pos)) {
                    if (this.hasCoverFromPlayer(pos)) {
                        coverPositions.push(pos);
                        break;
                    }
                }
            }
        }
        
        if (coverPositions.length > 0) {
            return coverPositions[Math.floor(Math.random() * coverPositions.length)];
        }
        return null;
    }
    
    hasCoverFromPlayer(position) {
        const playerPos = this.player.position;
        const direction = new THREE.Vector3();
        direction.subVectors(playerPos, position).normalize();
        
        const raycaster = new THREE.Raycaster(position, direction, 0, position.distanceTo(playerPos));
        
        const obstacleMeshes = [];
        this.obstacles.forEach(obstacle => {
            if (obstacle.userData.isObstacle) {
                obstacle.traverse(child => {
                    if (child.isMesh) {
                        obstacleMeshes.push(child);
                    }
                });
            }
        });
        
        if (this.groundMesh) {
            obstacleMeshes.push(this.groundMesh);
        }
        
        const intersects = raycaster.intersectObjects(obstacleMeshes);
        return intersects.length > 0;
    }
    
    faceTarget(enemy, targetPosition) {
        const directionToTarget = new THREE.Vector3();
        directionToTarget.subVectors(targetPosition, enemy.position);
        directionToTarget.y = 0;
        directionToTarget.normalize();
        
        const angle = Math.atan2(directionToTarget.x, directionToTarget.z);
        enemy.rotation.y = angle;
    }
    
    moveToTarget(enemy, targetPosition, delta) {
        const directionToTarget = new THREE.Vector3();
        directionToTarget.subVectors(targetPosition, enemy.position);
        directionToTarget.y = 0;
        directionToTarget.normalize();
        
        const moveSpeed = 3;
        const moveVector = directionToTarget.clone().multiplyScalar(moveSpeed * delta);
        
        const newPos = enemy.position.clone().add(moveVector);
        const terrainHeight = this.getTerrainHeight(newPos.x, newPos.z);
        newPos.y = terrainHeight;
        
        if (!this.checkObstacleCollision(newPos)) {
            enemy.position.copy(newPos);
        }
    }
    
    hasLineOfSightToTarget(enemy, targetPosition) {
        const enemyPos = enemy.position.clone();
        enemyPos.y += 1.3;
        
        const targetPos = targetPosition.clone();
        targetPos.y += 1.0;
        
        const distance = enemyPos.distanceTo(targetPos);
        const direction = new THREE.Vector3();
        direction.subVectors(targetPos, enemyPos).normalize();
        
        const raycaster = new THREE.Raycaster(enemyPos, direction, 0, distance);
        
        const obstacleMeshes = [];
        this.obstacles.forEach(obstacle => {
            if (obstacle.userData.isObstacle) {
                obstacle.traverse(child => {
                    if (child.isMesh) {
                        obstacleMeshes.push(child);
                    }
                });
            }
        });
        
        if (this.groundMesh) {
            obstacleMeshes.push(this.groundMesh);
        }
        
        const intersects = raycaster.intersectObjects(obstacleMeshes);
        
        return intersects.length === 0;
    }
    
    enemyShootTarget(enemy, target, distanceToTarget) {
        if (!enemy || !enemy.userData || enemy.userData.isDead) return;
        
        const data = enemy.userData;
        
        if (Math.random() > data.accuracy) {
            return;
        }
        
        let damage = data.enemyDamage * 1.5;
        
        const minDistance = 10;
        const maxDistance = 100;
        const minMultiplier = 1.5;
        const maxMultiplier = 2.5;
        
        if (distanceToTarget <= minDistance) {
            damage *= maxMultiplier;
        } else if (distanceToTarget >= maxDistance) {
            damage *= minMultiplier;
        } else {
            const distanceRatio = (maxDistance - distanceToTarget) / (maxDistance - minDistance);
            const distanceMultiplier = minMultiplier + (maxMultiplier - minMultiplier) * distanceRatio;
            damage *= distanceMultiplier;
        }
        
        damage = Math.round(damage);
        
        this.showEnemyMuzzleFlash(enemy);
        
        if (target === this.player) {
            this.playerTakeDamage(damage, enemy.position);
        } else if (target.userData) {
            target.userData.health -= damage;
            
            this.showDamageNumber(damage, target.position.clone().add(new THREE.Vector3(0, 1.5, 0)), false, false);
            
            if (target.userData.health <= 0) {
                target.userData.isDead = true;
                this.scene.remove(target);
            }
        }
    }
    
    checkObstacleCollision(newPos) {
        const enemyRadius = 0.5;
        
        for (const obstacle of this.obstacles) {
            if (!obstacle.userData.isObstacle) continue;
            
            const obstaclePos = obstacle.position;
            const obstacleRadius = obstacle.userData.radius || 1;
            
            const dx = newPos.x - obstaclePos.x;
            const dz = newPos.z - obstaclePos.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            
            if (distance < enemyRadius + obstacleRadius) {
                return true;
            }
        }
        
        return false;
    }
    
    showEnemyMuzzleFlash(enemy) {
        if (!enemy || !this.targets.includes(enemy)) return;
        
        const flashGeometry = new THREE.SphereGeometry(0.1, 4, 4);
        const flashMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            transparent: true,
            opacity: 1
        });
        const flash = new THREE.Mesh(flashGeometry, flashMaterial);
        
        flash.position.copy(enemy.position);
        flash.position.y += 1.3;
        flash.position.x += Math.sin(enemy.rotation.y) * 0.5;
        flash.position.z += Math.cos(enemy.rotation.y) * 0.5;
        
        this.scene.add(flash);
        
        setTimeout(() => {
            this.scene.remove(flash);
        }, 100);
    }
    
    playerTakeDamage(damage, fromPosition) {
        if (this.targets.length === 0) {
            console.log('playerTakeDamage blocked: no targets');
            return;
        }
        
        let isFromValidEnemy = false;
        let validEnemy = null;
        for (const target of this.targets) {
            if (!target.userData.isDead && 
                target.userData.health > 0 &&
                target.position.distanceTo(fromPosition) < 3) {
                isFromValidEnemy = true;
                validEnemy = target;
                break;
            }
        }
        
        if (!isFromValidEnemy) {
            console.log('playerTakeDamage blocked: no valid enemy near source', {
                fromPosition: `(${fromPosition.x.toFixed(1)}, ${fromPosition.z.toFixed(1)})`,
                targetsCount: this.targets.length,
                targets: this.targets.map(t => ({
                    pos: `(${t.position.x.toFixed(1)}, ${t.position.z.toFixed(1)})`,
                    isDead: t.userData.isDead,
                    health: t.userData.health
                }))
            });
            return;
        }
        
        console.log(`Player taking ${damage} damage from enemy at (${validEnemy.position.x.toFixed(1)}, ${validEnemy.position.z.toFixed(1)})`);
        
        this.player.health -= damage;
        this.updateHealthUI();
        
        this.showDamageScreenEffect();
        this.showHitDirectionIndicator(fromPosition);
        
        if (this.player.health <= 0) {
            this.gameOver();
        }
    }
    
    showHitDirectionIndicator(fromPosition) {
        const indicator = document.createElement('div');
        indicator.className = 'hit-direction-indicator';
        
        const distance = 120;
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            margin-left: -30px;
            margin-top: -30px;
            pointer-events: none;
            z-index: 110;
        `;
        indicator.innerHTML = `
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%;">
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <polygon points="50,10 35,40 45,40 45,60 55,60 55,40 65,40" 
                    fill="#ff3333" 
                    stroke="#ff0000" 
                    stroke-width="2"
                    filter="url(#glow)"/>
            </svg>
        `;
        document.body.appendChild(indicator);
        
        const updateDirection = () => {
            if (!indicator.parentElement) return;
            
            const direction = new THREE.Vector3();
            direction.subVectors(fromPosition, this.player.position);
            direction.y = 0;
            direction.normalize();
            
            const angle = Math.atan2(direction.x, direction.z);
            const relativeAngle = angle - this.player.rotation.y;
            const arrowAngle = -relativeAngle * (180 / Math.PI) + 180;
            
            indicator.style.transform = `rotate(${arrowAngle}deg) translateY(-${distance}px)`;
        };
        
        updateDirection();
        
        const intervalId = setInterval(updateDirection, 16);
        
        setTimeout(() => {
            clearInterval(intervalId);
            indicator.remove();
        }, 500);
    }
    
    showDamageScreenEffect() {
        const overlay = document.createElement('div');
        overlay.className = 'damage-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, transparent 30%, rgba(255, 0, 0, 0.4) 100%);
            pointer-events: none;
            z-index: 100;
            animation: damage-pulse 0.3s ease-out forwards;
        `;
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.remove(), 300);
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));
        document.addEventListener('wheel', (e) => this.onWheel(e));
        document.addEventListener('click', () => this.requestPointerLock());
        document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
        
        window.addEventListener('resize', () => this.onResize());
        
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectCategory(e.target.dataset.category));
        });
        
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('resume-btn').addEventListener('click', () => this.resumeGame());
        document.getElementById('change-weapon-btn').addEventListener('click', () => this.showWeaponSelect());
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('settings-back').addEventListener('click', () => this.hideSettings());
        document.getElementById('sensitivity-slider').addEventListener('input', (e) => this.updateSensitivity(e));
        document.getElementById('quit-btn').addEventListener('click', () => this.quitGame());
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
    }
    
    onKeyDown(e) {
        this.keys[e.code] = true;
        
        if (e.code === 'Escape' && this.isGameStarted) {
            if (this.isPaused) {
                this.resumeGame();
            } else {
                this.togglePause();
            }
        }
        
        if (e.code === 'KeyR' && !this.isReloading && this.isGameStarted && !this.isPaused) {
            this.reload();
        }
        
        if (e.code === 'KeyF' && this.isGameStarted && !this.isPaused) {
            this.isHealing = true;
        }
        
        if (e.code === 'KeyV' && this.isGameStarted && !this.isPaused) {
            this.tryExtraction();
        }
        
        if (!this.isPaused && this.isGameStarted) {
            if (e.code === 'Digit1') this.switchWeaponCategory('assault');
            if (e.code === 'Digit2') this.switchWeaponCategory('smg');
            if (e.code === 'Digit3') this.switchWeaponCategory('dmr');
            if (e.code === 'KeyQ') this.cycleWeapon();
            if (e.code === 'KeyG') this.cycleCategory();
        }
    }
    
    onKeyUp(e) {
        this.keys[e.code] = false;
        
        if (e.code === 'KeyF') {
            this.isHealing = false;
            this.healAccumulator = 0;
        }
    }
    
    onMouseMove(e) {
        if (!this.isPointerLocked || this.isPaused) return;
        
        let sensitivity = this.mouseSensitivity;
        
        if (this.isAiming && this.currentScope) {
            if (this.currentScope.id === 'acog') {
                sensitivity *= 0.75;
            } else if (this.currentScope.id === 'scope8x') {
                sensitivity *= 0.5;
            }
        }
        
        this.player.rotation.y -= e.movementX * sensitivity;
        this.player.rotation.x -= e.movementY * sensitivity;
        
        this.player.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.player.rotation.x));
    }
    
    onMouseDown(e) {
        if (e.button === 0) {
            this.mouse.down = true;
        } else if (e.button === 2 && this.isGameStarted) {
            this.toggleAim(true);
        }
    }
    
    onMouseUp(e) {
        if (e.button === 0) {
            this.mouse.down = false;
        } else if (e.button === 2) {
            this.toggleAim(false);
        }
    }
    
    onWheel(e) {
        if (!this.isGameStarted) return;
        
        const currentIndex = this.scopes.findIndex(s => s.id === this.currentScope.id);
        let newIndex = currentIndex + (e.deltaY > 0 ? 1 : -1);
        newIndex = Math.max(0, Math.min(this.scopes.length - 1, newIndex));
        
        if (newIndex !== currentIndex) {
            this.currentScope = this.scopes[newIndex];
            this.updateScopeUI();
            this.updateCameraFOV();
        }
    }
    
    requestPointerLock() {
        if (this.isGameStarted && !this.isPaused) {
            document.body.requestPointerLock();
        }
    }
    
    onPointerLockChange() {
        this.isPointerLocked = document.pointerLockElement === document.body;
        
        if (!this.isPointerLocked && this.isGameStarted && !this.isPaused && !this.isInWeaponSelect && !this.isResuming) {
            this.togglePause();
        }
        
        if (this.isResuming && this.isPointerLocked) {
            this.isResuming = false;
        }
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    selectCategory(category) {
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.renderWeaponList(category);
    }
    
    renderWeaponSelect() {
        this.selectCategory('assault');
        this.renderScopeList();
    }
    
    renderWeaponList(category) {
        const container = document.getElementById('weapon-list');
        container.innerHTML = '';
        
        const weapons = this.weapons[category];
        weapons.forEach(weapon => {
            const card = document.createElement('div');
            card.className = 'weapon-card';
            card.dataset.id = weapon.id;
            card.dataset.category = category;
            
            const maxDamage = 70;
            const maxFireRate = 1000;
            const maxOptimalRange = 100;
            const maxMagSize = 50;
            
            const falloffPercent = Math.round(weapon.rangeFalloff * 100);
            
            card.innerHTML = `
                <h4>${weapon.name}</h4>
                <div class="stats">
                    <div class="stat-row">
                        <span>伤害</span>
                        <div class="stat-value">${weapon.damage}</div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${(weapon.damage / maxDamage) * 100}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>射速</span>
                        <div class="stat-value">${weapon.fireRate} RPM</div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${(weapon.fireRate / maxFireRate) * 100}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>优势射程</span>
                        <div class="stat-value">${weapon.optimalRange}m</div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${(weapon.optimalRange / maxOptimalRange) * 100}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>距离衰减</span>
                        <div class="stat-value">${falloffPercent}%/m</div>
                        <div class="stat-bar"><div class="stat-fill falloff" style="width: ${Math.min(100, falloffPercent * 5)}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>稳定性</span>
                        <div class="stat-value">${Math.round(weapon.stability * 100)}%</div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${weapon.stability * 100}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>弹匣容量</span>
                        <div class="stat-value">${weapon.magSize}发</div>
                        <div class="stat-bar"><div class="stat-fill" style="width: ${(weapon.magSize / maxMagSize) * 100}%"></div></div>
                    </div>
                    <div class="stat-row">
                        <span>换弹时间</span>
                        <div class="stat-value">${weapon.reloadTime}s</div>
                    </div>
                    <div class="stat-row">
                        <span>后坐力</span>
                        <div class="stat-value">${(weapon.recoil * 1000).toFixed(1)}</div>
                    </div>
                    <div class="stat-row">
                        <span>精准度</span>
                        <div class="stat-value">${(100 - weapon.spread * 1000).toFixed(0)}%</div>
                    </div>
                </div>
                <div class="pros-cons">
                    <div class="pros">优点: ${weapon.pros.join(', ')}</div>
                    <div class="cons">缺点: ${weapon.cons.join(', ')}</div>
                </div>
            `;
            
            card.addEventListener('click', () => this.selectWeapon(category, weapon.id));
            container.appendChild(card);
        });
    }
    
    renderScopeList() {
        const container = document.getElementById('scope-list');
        container.innerHTML = '';
        
        this.scopes.forEach((scope, index) => {
            const btn = document.createElement('button');
            btn.className = 'scope-btn' + (index === 0 ? ' selected' : '');
            btn.dataset.id = scope.id;
            btn.textContent = scope.name;
            btn.addEventListener('click', () => this.selectScope(scope.id));
            container.appendChild(btn);
        });
    }
    
    selectWeapon(category, weaponId) {
        document.querySelectorAll('.weapon-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.id === weaponId);
        });
        
        const weapon = this.weapons[category].find(w => w.id === weaponId);
        this.currentWeapon = weapon;
    }
    
    selectScope(scopeId) {
        document.querySelectorAll('.scope-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.id === scopeId);
        });
        
        this.currentScope = this.scopes.find(s => s.id === scopeId);
    }
    
    switchWeaponCategory(category) {
        const weapon = this.weapons[category][0];
        if (weapon) {
            this.currentWeapon = weapon;
            this.currentAmmo = weapon.magSize;
            this.reserveAmmo = weapon.reserveAmmo;
            this.updateWeaponUI();
            this.updateAmmoUI();
            this.createWeaponModel(weapon.id);
        }
    }
    
    cycleWeapon() {
        const categories = ['assault', 'smg', 'dmr'];
        let currentCategory = null;
        let currentIndex = 0;
        
        for (const cat of categories) {
            const idx = this.weapons[cat].findIndex(w => w.id === this.currentWeapon.id);
            if (idx !== -1) {
                currentCategory = cat;
                currentIndex = idx;
                break;
            }
        }
        
        if (currentCategory) {
            const weapons = this.weapons[currentCategory];
            const nextIndex = (currentIndex + 1) % weapons.length;
            const nextWeapon = weapons[nextIndex];
            
            this.currentWeapon = nextWeapon;
            this.currentAmmo = nextWeapon.magSize;
            this.reserveAmmo = nextWeapon.reserveAmmo;
            this.updateWeaponUI();
            this.updateAmmoUI();
            this.createWeaponModel(nextWeapon.id);
        }
    }
    
    cycleCategory() {
        const categories = ['assault', 'smg', 'dmr'];
        let currentCategoryIndex = 0;
        
        for (let i = 0; i < categories.length; i++) {
            if (this.weapons[categories[i]].find(w => w.id === this.currentWeapon.id)) {
                currentCategoryIndex = i;
                break;
            }
        }
        
        const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
        const nextCategory = categories[nextCategoryIndex];
        const weapon = this.weapons[nextCategory][0];
        
        this.currentWeapon = weapon;
        this.currentAmmo = weapon.magSize;
        this.reserveAmmo = weapon.reserveAmmo;
        this.updateWeaponUI();
        this.updateAmmoUI();
        this.createWeaponModel(weapon.id);
    }
    
    updateScopeUI() {
        document.querySelectorAll('.scope-btn').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.id === this.currentScope.id);
        });
    }
    
    updateCameraFOV() {
        const baseFOV = 75;
        const targetFOV = this.isAiming ? baseFOV / this.currentScope.zoom : baseFOV;
        this.camera.fov = targetFOV;
        this.camera.updateProjectionMatrix();
    }
    
    startGame() {
        if (!this.currentWeapon) {
            this.currentWeapon = this.weapons.assault[0];
        }
        
        this.currentAmmo = this.currentWeapon.magSize;
        this.reserveAmmo = this.currentWeapon.reserveAmmo;
        
        this.setRandomSpawnPosition();
        
        document.getElementById('weapon-select').classList.add('hidden');
        this.isGameStarted = true;
        this.isPaused = false;
        this.isInWeaponSelect = false;
        
        this.spawnTargets();
        this.updateWeaponUI();
        this.updateAmmoUI();
        this.updateScoreUI();
        this.updateHealthUI();
        this.createWeaponModel(this.currentWeapon.id);
        
        document.body.requestPointerLock();
    }
    
    setRandomSpawnPosition() {
        const corners = [
            { x: -85, z: 85, rotY: -Math.PI * 0.75 },
            { x: 85, z: 85, rotY: Math.PI * 0.75 },
            { x: -85, z: -85, rotY: -Math.PI * 0.25 },
            { x: 85, z: -85, rotY: Math.PI * 0.25 }
        ];
        
        const corner = corners[Math.floor(Math.random() * corners.length)];
        const terrainHeight = this.getTerrainHeight(corner.x, corner.z);
        
        this.player.position.set(corner.x, terrainHeight + 1.7, corner.z);
        this.player.rotation.x = 0;
        this.player.rotation.y = corner.rotY;
        
        if (this.playerModel) {
            this.playerModel.position.set(corner.x, terrainHeight, corner.z);
            this.playerModel.rotation.y = corner.rotY;
        }
    }
    
    togglePause() {
        this.isPaused = !this.isPaused;
        document.getElementById('pause-menu').classList.toggle('hidden', !this.isPaused);
        
        if (this.isPaused) {
            document.exitPointerLock();
        } else {
            document.body.requestPointerLock();
        }
    }
    
    resumeGame() {
        this.isPaused = false;
        this.isResuming = true;
        document.getElementById('pause-menu').classList.add('hidden');
        document.body.requestPointerLock();
    }
    
    showSettings() {
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('settings-menu').classList.remove('hidden');
        
        const sensitivityValue = Math.round(this.mouseSensitivity / 0.001 * 100);
        document.getElementById('sensitivity-slider').value = sensitivityValue;
        document.getElementById('sensitivity-value').textContent = sensitivityValue;
    }
    
    hideSettings() {
        document.getElementById('settings-menu').classList.add('hidden');
        document.getElementById('pause-menu').classList.remove('hidden');
    }
    
    updateSensitivity(e) {
        const value = parseInt(e.target.value);
        this.mouseSensitivity = (value / 100) * 0.001;
        document.getElementById('sensitivity-value').textContent = value;
    }
    
    showWeaponSelect() {
        this.isPaused = false;
        this.isInWeaponSelect = true;
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('weapon-select').classList.remove('hidden');
        document.exitPointerLock();
    }
    
    quitGame() {
        this.isGameStarted = false;
        this.isPaused = false;
        this.isInWeaponSelect = true;
        this.score = 0;
        this.kills = 0;
        this.player.health = this.player.maxHealth;
        
        this.targets.forEach(target => this.scene.remove(target));
        this.targets = [];
        
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('weapon-select').classList.remove('hidden');
        
        this.player.position.set(0, 1.7, 80);
        this.player.rotation.x = 0;
        this.player.rotation.y = Math.PI;
        
        if (this.playerModel) {
            this.playerModel.position.set(0, 0, 80);
            this.playerModel.rotation.y = Math.PI;
        }
    }
    
    restartGame() {
        document.getElementById('game-over').classList.add('hidden');
        
        const victoryScreen = document.getElementById('victory-screen');
        if (victoryScreen) victoryScreen.remove();
        
        const extractionSuccess = document.getElementById('extraction-success');
        if (extractionSuccess) extractionSuccess.remove();
        
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) gameOverScreen.remove();
        
        const extractionPrompt = document.getElementById('extraction-prompt');
        if (extractionPrompt) extractionPrompt.remove();
        
        this.score = 0;
        this.kills = 0;
        this.player.health = this.player.maxHealth;
        this.currentAmmo = this.currentWeapon.magSize;
        this.reserveAmmo = this.currentWeapon.reserveAmmo;
        
        this.hasChest = false;
        this.isInExtractionZone = false;
        
        const chestStatus = document.getElementById('chest-status');
        if (chestStatus) {
            chestStatus.classList.add('hidden');
        }
        
        if (this.chest) {
            this.scene.remove(this.chest);
        }
        this.createChest();
        
        if (this.extractionPoint) {
            this.scene.remove(this.extractionPoint);
        }
        if (this.extractionMarker) {
            this.extractionMarker.remove();
        }
        this.createExtractionPoint();
        
        this.setRandomSpawnPosition();
        
        this.spawnTargets();
        this.updateWeaponUI();
        this.updateAmmoUI();
        this.updateScoreUI();
        this.updateHealthUI();
        
        this.isGameStarted = true;
        this.isInWeaponSelect = false;
        document.body.requestPointerLock();
    }
    
    toggleAim(isAiming) {
        this.isAiming = isAiming;
        this.updateCameraFOV();
        this.updateWeaponPosition();
        
        const crosshair = document.getElementById('crosshair');
        const scopeCrosshair = document.getElementById('scope-crosshair');
        
        crosshair.style.opacity = isAiming ? '0' : '1';
        
        if (isAiming) {
            scopeCrosshair.classList.remove('hidden');
            const overlay = document.createElement('div');
            overlay.className = 'scope-overlay';
            overlay.id = 'scope-overlay';
            document.body.appendChild(overlay);
        } else {
            scopeCrosshair.classList.add('hidden');
            const overlay = document.getElementById('scope-overlay');
            if (overlay) overlay.remove();
        }
    }
    
    shoot() {
        if (!this.isGameStarted || this.isPaused || this.isReloading) return;
        if (this.currentAmmo <= 0) {
            this.reload();
            return;
        }
        
        const now = performance.now();
        const fireInterval = 60000 / this.currentWeapon.fireRate;
        
        if (now - this.lastFireTime < fireInterval) return;
        
        this.lastFireTime = now;
        this.currentAmmo--;
        this.updateAmmoUI();
        
        this.applyRecoil();
        this.createMuzzleFlash();
        
        const spread = this.currentWeapon.spread * (this.isAiming ? 0.5 : 1) / this.currentScope.accuracy;
        const direction = new THREE.Vector3(0, 0, -1);
        direction.applyQuaternion(this.camera.quaternion);
        
        direction.x += (Math.random() - 0.5) * spread;
        direction.y += (Math.random() - 0.5) * spread;
        direction.normalize();
        
        this.raycaster.set(this.camera.position, direction);
        
        const targetMeshes = [];
        this.targets.forEach(target => {
            target.traverse(child => {
                if (child.isMesh) {
                    targetMeshes.push(child);
                }
            });
        });
        
        const obstacleMeshes = [];
        this.obstacles.forEach(obstacle => {
            obstacle.traverse(child => {
                if (child.isMesh) {
                    obstacleMeshes.push(child);
                }
            });
        });
        
        if (this.groundMesh) {
            obstacleMeshes.push(this.groundMesh);
        }
        
        const targetIntersects = this.raycaster.intersectObjects(targetMeshes);
        const obstacleIntersects = this.raycaster.intersectObjects(obstacleMeshes);
        
        let hitTarget = null;
        let hitDistance = Infinity;
        
        if (targetIntersects.length > 0) {
            hitTarget = targetIntersects[0];
            hitDistance = hitTarget.distance;
        }
        
        if (obstacleIntersects.length > 0 && obstacleIntersects[0].distance < hitDistance) {
            this.showBulletImpact(obstacleIntersects[0].point, obstacleIntersects[0].face.normal);
            return;
        }
        
        if (hitTarget) {
            const hit = hitTarget;
            const targetGroup = hit.object.parent;
            const hitPart = hit.object.name;
            
            let damage = this.currentWeapon.damage;
            const distance = hit.distance;
            let isRangeFalloff = false;
            
            if (distance > this.currentWeapon.optimalRange) {
                const excessDistance = distance - this.currentWeapon.optimalRange;
                const falloffMultiplier = 1 - (excessDistance * this.currentWeapon.rangeFalloff);
                damage *= Math.max(0.3, falloffMultiplier);
                isRangeFalloff = true;
            }
            
            let isHeadshot = false;
            if (hitPart === 'head') {
                damage *= 2;
                isHeadshot = true;
            } else if (hitPart === 'torso') {
                damage *= 1;
            } else if (hitPart === 'leftArm' || hitPart === 'rightArm' || hitPart === 'leftLeg' || hitPart === 'rightLeg') {
                damage *= 0.5;
            }
            
            this.showHitMarker(isHeadshot);
            
            targetGroup.userData.health -= damage;
            targetGroup.userData.lastHitHeadshot = isHeadshot;
            this.showDamageNumber(damage, hit.point, isHeadshot, isRangeFalloff);
            
            if (targetGroup.userData.health <= 0) {
                this.killTarget(targetGroup, isHeadshot, distance);
            }
        }
    }
    
    showBulletImpact(position, normal) {
        const impactGeometry = new THREE.CircleGeometry(0.05, 8);
        const impactMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x333333,
            side: THREE.DoubleSide
        });
        const impact = new THREE.Mesh(impactGeometry, impactMaterial);
        impact.position.copy(position);
        impact.position.addScaledVector(normal, 0.01);
        impact.lookAt(position.clone().add(normal));
        this.scene.add(impact);
        
        setTimeout(() => {
            this.scene.remove(impact);
            impact.geometry.dispose();
            impact.material.dispose();
        }, 2000);
    }
    
    applyRecoil() {
        const recoilAmount = this.currentWeapon.recoil * (this.isAiming ? 0.6 : 1);
        const stabilityFactor = this.currentWeapon.stability;
        
        this.player.rotation.x += recoilAmount * (0.8 + Math.random() * 0.4);
        this.player.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.player.rotation.x));
        this.player.rotation.y += (Math.random() - 0.5) * recoilAmount * 0.3;
        
        this.recoilRecovery = recoilAmount;
    }
    
    recoverRecoil(delta) {
        if (this.recoilRecovery > 0) {
            const recovery = this.recoilRecovery * delta * 5 * this.currentWeapon.stability;
            this.player.rotation.x -= recovery;
            this.player.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.player.rotation.x));
            this.recoilRecovery -= recovery;
        }
    }
    
    createMuzzleFlash() {
        const flash = document.createElement('div');
        flash.className = 'muzzle-flash';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 100);
    }
    
    showHitMarker(isHeadshot) {
        const marker = document.getElementById('hit-marker');
        marker.classList.remove('hidden', 'headshot');
        if (isHeadshot) {
            marker.classList.add('headshot');
        }
        
        setTimeout(() => {
            marker.classList.add('hidden');
            marker.classList.remove('headshot');
        }, 100);
    }
    
    showDamageNumber(damage, position, isHeadshot, isRangeFalloff) {
        const indicator = document.createElement('div');
        indicator.id = 'damage-indicator';
        indicator.textContent = Math.round(damage);
        if (isHeadshot) {
            indicator.style.color = '#ff0000';
            indicator.style.fontSize = '32px';
        } else if (isRangeFalloff) {
            indicator.style.color = '#ff8800';
        } else if (damage < this.currentWeapon.damage) {
            indicator.style.color = '#ffaa00';
        } else {
            indicator.style.color = '#ffffff';
        }
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.remove(), 500);
    }
    
    killTarget(target, isHeadshot = false, distance = 0) {
        target.userData.isDead = true;
        
        this.kills++;
        const distanceBonus = Math.round(distance / 10);
        const scoreGained = 100 + distanceBonus;
        this.score += scoreGained;
        
        this.updateScoreUI();
        this.showKillNotification(isHeadshot, distance, scoreGained);
        
        this.scene.remove(target);
        this.targets = this.targets.filter(t => t !== target);
    }
    
    gameOver() {
        this.isGameStarted = false;
        this.isHealing = false;
        document.exitPointerLock();
        
        const gameOverDiv = document.createElement('div');
        gameOverDiv.id = 'game-over-screen';
        gameOverDiv.innerHTML = `
            <h2>游戏结束</h2>
            <div>你被击杀了!</div>
            <div>最终得分: ${this.score}</div>
            <div>击杀数: ${this.kills}</div>
            <button id="gameover-restart-btn">再来一局</button>
        `;
        gameOverDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(50, 0, 0, 0.95);
            padding: 40px;
            border-radius: 15px;
            border: 3px solid #ff4444;
            text-align: center;
            z-index: 300;
            color: #fff;
        `;
        document.body.appendChild(gameOverDiv);
        
        document.getElementById('gameover-restart-btn').addEventListener('click', () => {
            gameOverDiv.remove();
            this.restartGame();
        });
    }
    
    showKillNotification(isHeadshot, distance, score) {
        const notification = document.getElementById('kill-notification');
        if (!notification) return;
        
        notification.classList.remove('hidden', 'headshot');
        if (isHeadshot) {
            notification.classList.add('headshot');
        }
        
        const distanceEl = notification.querySelector('.kill-distance');
        const scoreEl = notification.querySelector('.kill-score');
        
        if (distanceEl) {
            distanceEl.textContent = `${Math.round(distance)}m`;
        }
        if (scoreEl) {
            scoreEl.textContent = `+${score} 分`;
        }
        
        void notification.offsetWidth;
        
        setTimeout(() => {
            notification.classList.add('hidden');
            notification.classList.remove('headshot');
        }, 2000);
    }
    
    reload() {
        if (this.isReloading) return;
        if (this.currentAmmo === this.currentWeapon.magSize) return;
        
        this.isReloading = true;
        this.reloadAnimationProgress = 0;
        document.getElementById('ammo-display').classList.add('reloading');
        
        setTimeout(() => {
            this.currentAmmo = this.currentWeapon.magSize;
            
            this.updateAmmoUI();
            this.isReloading = false;
            this.reloadAnimationProgress = 0;
            document.getElementById('ammo-display').classList.remove('reloading');
        }, this.currentWeapon.reloadTime * 1000);
    }
    
    updateReloadAnimation(delta) {
        if (!this.isReloading || !this.weaponContainer) return;
        
        const reloadDuration = this.currentWeapon.reloadTime;
        this.reloadAnimationProgress += delta / reloadDuration;
        
        const progress = this.reloadAnimationProgress;
        let rotationX = 0;
        let positionY = -0.2;
        
        if (progress < 0.3) {
            const t = progress / 0.3;
            rotationX = -0.5 * t;
            positionY = -0.2 - 0.1 * t;
        } else if (progress < 0.5) {
            rotationX = -0.5;
            positionY = -0.3;
        } else if (progress < 0.7) {
            const t = (progress - 0.5) / 0.2;
            rotationX = -0.5 + 0.5 * t;
            positionY = -0.3 + 0.1 * t;
        } else {
            rotationX = 0;
            positionY = -0.2;
        }
        
        this.weaponContainer.rotation.x = rotationX;
        this.weaponContainer.position.y = positionY;
    }
    
    updatePlayer(delta) {
        if (!this.isGameStarted || this.isPaused) return;
        
        const moveSpeed = this.player.speed * delta;
        const direction = new THREE.Vector3();
        
        if (this.keys['KeyW']) direction.z -= 1;
        if (this.keys['KeyS']) direction.z += 1;
        if (this.keys['KeyA']) direction.x -= 1;
        if (this.keys['KeyD']) direction.x += 1;
        
        this.player.isMoving = direction.length() > 0;
        
        if (this.player.isMoving) {
            direction.normalize();
            direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.player.rotation.y);
            
            const newX = this.player.position.x + direction.x * moveSpeed;
            const newZ = this.player.position.z + direction.z * moveSpeed;
            
            let canMoveX = Math.abs(newX) < 95;
            let canMoveZ = Math.abs(newZ) < 95;
            
            this.obstacles.forEach(obstacle => {
                if (obstacle.userData.isObstacle) {
                    const dx = newX - obstacle.position.x;
                    const dz = newZ - obstacle.position.z;
                    const dist = Math.sqrt(dx * dx + dz * dz);
                    
                    if (dist < obstacle.userData.radius + 0.5) {
                        const checkX = Math.abs(newX - obstacle.position.x) < obstacle.userData.radius + 0.5;
                        const checkZ = Math.abs(newZ - obstacle.position.z) < obstacle.userData.radius + 0.5;
                        
                        if (checkX && Math.abs(this.player.position.z - obstacle.position.z) < obstacle.userData.radius + 0.5) {
                            canMoveX = false;
                        }
                        if (checkZ && Math.abs(this.player.position.x - obstacle.position.x) < obstacle.userData.radius + 0.5) {
                            canMoveZ = false;
                        }
                    }
                }
            });
            
            if (canMoveX) this.player.position.x = newX;
            if (canMoveZ) this.player.position.z = newZ;
        }
        
        const terrainHeight = this.getTerrainHeight(this.player.position.x, this.player.position.z);
        this.player.position.y = terrainHeight + 1.7;
        
        if (this.playerModel) {
            this.playerModel.position.set(
                this.player.position.x,
                terrainHeight,
                this.player.position.z
            );
            this.playerModel.rotation.y = this.player.rotation.y;
        }
        
        this.camera.position.copy(this.player.position);
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.player.rotation.y;
        this.camera.rotation.x = this.player.rotation.x;
        this.camera.rotation.z = 0;
        
        this.recoverRecoil(delta);
        
        if (this.mouse.down && this.isPointerLocked) {
            this.shoot();
        }
        
        this.checkChestPickup();
        this.checkExtraction();
        this.updateExtractionMarker();
        this.updateExtractionPrompt();
    }
    
    updateExtractionPrompt() {
        let prompt = document.getElementById('extraction-prompt');
        
        if (this.isInExtractionZone) {
            if (!prompt) {
                prompt = document.createElement('div');
                prompt.id = 'extraction-prompt';
                prompt.style.cssText = `
                    position: fixed;
                    bottom: 150px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 255, 0, 0.9);
                    color: #000;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 18px;
                    font-weight: bold;
                    z-index: 100;
                `;
                document.body.appendChild(prompt);
            }
            
            if (this.hasChest) {
                prompt.innerHTML = '按 V 撤离';
                prompt.style.background = 'rgba(0, 255, 0, 0.9)';
            } else {
                prompt.innerHTML = '需要携带宝箱才能撤离';
                prompt.style.background = 'rgba(255, 165, 0, 0.9)';
            }
        } else if (prompt) {
            prompt.remove();
        }
    }
    
    checkChestPickup() {
        if (this.hasChest || !this.chest) return;
        
        const distance = this.player.position.distanceTo(this.chest.position);
        
        if (distance < 2) {
            this.hasChest = true;
            this.scene.remove(this.chest);
            this.chest = null;
            
            this.showChestPickupNotification();
        }
    }
    
    showChestPickupNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = '📦 已获取宝箱！前往撤离点撤离！';
        notification.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 215, 0, 0.9);
            color: #000;
            padding: 15px 30px;
            border-radius: 10px;
            font-size: 20px;
            font-weight: bold;
            z-index: 200;
            animation: fadeInOut 3s forwards;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
        
        const chestStatus = document.getElementById('chest-status');
        if (chestStatus) {
            chestStatus.classList.remove('hidden');
        }
    }
    
    checkExtraction() {
        if (!this.extractionPoint) return;
        
        const distance = this.player.position.distanceTo(this.extractionPoint.position);
        
        this.isInExtractionZone = distance < 3;
    }
    
    tryExtraction() {
        if (this.isInExtractionZone && this.hasChest) {
            this.showExtractionSuccess();
        }
    }
    
    showExtractionSuccess() {
        this.isGameStarted = false;
        document.exitPointerLock();
        
        const successDiv = document.createElement('div');
        successDiv.id = 'extraction-success';
        successDiv.innerHTML = `
            <h2>🎉 撤离成功！</h2>
            <div>你成功携带宝箱撤离！</div>
            <div>最终得分: ${this.score}</div>
            <div>击杀数: ${this.kills}</div>
            <button id="extraction-restart-btn">再来一局</button>
        `;
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 100, 0, 0.95);
            padding: 40px;
            border-radius: 15px;
            border: 3px solid #00ff00;
            text-align: center;
            z-index: 300;
            color: #fff;
        `;
        document.body.appendChild(successDiv);
        
        document.getElementById('extraction-restart-btn').addEventListener('click', () => {
            successDiv.remove();
            this.restartGame();
        });
    }
    
    updateWeaponUI() {
        document.getElementById('weapon-name').textContent = this.currentWeapon.name;
        document.getElementById('stat-damage').textContent = this.currentWeapon.damage;
        document.getElementById('stat-firerate').textContent = this.currentWeapon.fireRate;
        document.getElementById('stat-range').textContent = this.currentWeapon.optimalRange;
    }
    
    updateAmmoUI() {
        document.getElementById('current-ammo').textContent = this.currentAmmo;
        document.getElementById('reserve-ammo').textContent = '∞';
    }
    
    updateScoreUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('kills').textContent = this.kills;
    }
    
    updateHealthUI() {
        const percentage = (this.player.health / this.player.maxHealth) * 100;
        document.getElementById('health-fill').style.width = percentage + '%';
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const delta = this.clock.getDelta();
        
        if (this.isGameStarted && !this.isPaused) {
            this.updatePlayer(delta);
            this.updateTargets(delta);
            this.updateReloadAnimation(delta);
            this.updateHealing(delta);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    updateHealing(delta) {
        if (this.isHealing && this.player.health > 0 && this.player.health < this.player.maxHealth) {
            const healRate = 7.5;
            this.healAccumulator += healRate * delta;
            
            if (this.healAccumulator >= 1) {
                const healAmount = Math.floor(this.healAccumulator);
                this.player.health = Math.min(this.player.maxHealth, this.player.health + healAmount);
                this.healAccumulator -= healAmount;
                this.updateHealthUI();
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new ShootingGame();
});
