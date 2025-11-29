
import React, { useState, useRef } from "react";
import {
    Search,
    Upload,
    Plus,
    Edit,
    Trash2,
    Eye,
    Download,
    Box,
    Image as ImageIcon,
    Video,
    X,
    FileText,
    Maximize2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initialAssets = [
    {
        id: 1,
        name: "Taj Mahal 3D Model",
        type: "3D Model",
        destination: "Taj Mahal",
        fileSize: "45 MB",
        format: "GLB",
        uploadDate: "2024-11-15",
        downloads: 1250,
        status: "active",
        views: 3500,
        previewUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        name: "Red Fort VR Tour",
        type: "VR Experience",
        destination: "Red Fort",
        fileSize: "120 MB",
        format: "Unity",
        uploadDate: "2024-11-10",
        downloads: 890,
        status: "active",
        views: 2800,
        previewUrl: "https://images.unsplash.com/photo-1598556776374-2273e95922b2?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        name: "Jaipur City AR Overlay",
        type: "AR Asset",
        destination: "Jaipur",
        fileSize: "35 MB",
        format: "USDZ",
        uploadDate: "2024-11-05",
        downloads: 650,
        status: "active",
        views: 1900,
        previewUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        name: "Kerala Backwaters 360° Video",
        type: "360° Video",
        destination: "Kerala",
        fileSize: "200 MB",
        format: "MP4",
        uploadDate: "2024-10-28",
        downloads: 1100,
        status: "active",
        views: 4200,
        previewUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 5,
        name: "Goa Beach AR Markers",
        type: "AR Asset",
        destination: "Goa",
        fileSize: "15 MB",
        format: "PNG",
        uploadDate: "2024-10-20",
        downloads: 420,
        status: "processing",
        views: 980,
        previewUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800"
    },
];

export default function Assets() {
    const [assets, setAssets] = useState(initialAssets);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [newItem, setNewItem] = useState(null);
    const [viewingAsset, setViewingAsset] = useState(null);
    const fileInputRef = useRef(null);

    const getTypeColor = (type) => {
        switch (type) {
            case "3D Model":
                return "bg-blue-100 text-blue-700";
            case "VR Experience":
                return "bg-purple-100 text-purple-700";
            case "AR Asset":
                return "bg-green-100 text-green-700";
            case "360° Video":
                return "bg-orange-100 text-orange-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case "3D Model":
                return <Box className="w-5 h-5" />;
            case "VR Experience":
                return <Eye className="w-5 h-5" />;
            case "AR Asset":
                return <ImageIcon className="w-5 h-5" />;
            case "360° Video":
                return <Video className="w-5 h-5" />;
            default:
                return <Box className="w-5 h-5" />;
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";
            const fileExtension = file.name.split('.').pop().toUpperCase();
            const previewUrl = URL.createObjectURL(file);

            setNewItem({
                name: file.name.split('.')[0],
                fileSize: fileSizeMB,
                format: fileExtension,
                type: "3D Model", // Default
                destination: "",
                uploadDate: new Date().toISOString().split('T')[0],
                downloads: 0,
                views: 0,
                status: "processing",
                previewUrl: previewUrl
            });
            setIsUploadModalOpen(true);
        }
        // Reset input so same file can be selected again if needed
        e.target.value = null;
    };

    const handleSaveAsset = () => {
        if (!newItem.name || !newItem.destination) return;

        const newAsset = {
            id: assets.length + 1,
            ...newItem
        };

        setAssets([newAsset, ...assets]);
        setIsUploadModalOpen(false);
        setNewItem(null);
    };

    return (
        <div className="space-y-6 relative">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".glb,.gltf,.usdz,.obj,.fbx,.mp4,.png,.jpg"
                onChange={handleFileChange}
            />

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        AR/VR Asset Management
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage immersive tourism experiences
                    </p>
                </div>
                <Button className="gap-2" onClick={handleUploadClick}>
                    <Plus className="w-4 h-4" />
                    Upload Asset
                </Button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Total Assets */}
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Assets</p>
                                <p className="text-3xl font-bold text-foreground">{assets.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Box className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Downloads */}
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Downloads</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {(assets.reduce((s, a) => s + a.downloads, 0) / 1000).toFixed(1)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Download className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Views */}
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Views</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {(assets.reduce((s, a) => s + a.views, 0) / 1000).toFixed(1)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Storage Used (static placeholder) */}
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Storage Used</p>
                                <p className="text-3xl font-bold text-orange-600">615 MB</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Upload className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search bar */}
            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Asset list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {assets
                    .filter((a) =>
                        a.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((asset) => (
                        <Card
                            key={asset.id}
                            className="glass-card border-border hover:shadow-xl transition-all"
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-16 h-16 ${getTypeColor(
                                            asset.type
                                        )} rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden relative group cursor-pointer`}
                                        onClick={() => setViewingAsset(asset)}
                                    >
                                        {asset.previewUrl ? (
                                            <img
                                                src={asset.previewUrl}
                                                alt={asset.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            getTypeIcon(asset.type)
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Maximize2 className="w-6 h-6 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg">{asset.name}</h3>
                                                <p className="text-muted-foreground">
                                                    {asset.destination}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={asset.status === "active" ? "success" : "warning"}
                                            >
                                                {asset.status}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                            <div>
                                                <p className="text-slate-500">Type</p>
                                                <p className="font-semibold">{asset.type}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Format</p>
                                                <p className="font-semibold">{asset.format}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">File Size</p>
                                                <p className="font-semibold">{asset.fileSize}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-500">Uploaded</p>
                                                <p className="font-semibold">{asset.uploadDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Download className="w-4 h-4" />
                                                <span>{asset.downloads} downloads</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                <span>{asset.views} views</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                                            <Button
                                                variant="outline"
                                                className="flex-1"
                                                size="sm"
                                                onClick={() => setViewingAsset(asset)}
                                            >
                                                <Eye className="w-4 h-4 mr-1" />
                                                Preview
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && newItem && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md border border-border p-6 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Upload New Asset</h2>
                            <button
                                onClick={() => setIsUploadModalOpen(false)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* File Info Card */}
                            <div className="bg-muted/50 p-4 rounded-xl flex items-center gap-3 border border-border">
                                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                                    {newItem.previewUrl ? (
                                        <img
                                            src={newItem.previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FileText className="w-8 h-8 text-blue-600" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium truncate max-w-[200px]">{newItem.name}.{newItem.format.toLowerCase()}</p>
                                    <p className="text-xs text-muted-foreground">{newItem.fileSize} • {newItem.format}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Asset Name</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Destination</label>
                                <input
                                    type="text"
                                    value={newItem.destination}
                                    onChange={(e) => setNewItem({ ...newItem, destination: e.target.value })}
                                    placeholder="e.g. Taj Mahal, Jaipur"
                                    className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Asset Type</label>
                                <select
                                    value={newItem.type}
                                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                                    className="w-full px-4 py-2 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="3D Model">3D Model</option>
                                    <option value="VR Experience">VR Experience</option>
                                    <option value="AR Asset">AR Asset</option>
                                    <option value="360° Video">360° Video</option>
                                </select>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setIsUploadModalOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleSaveAsset}
                                    disabled={!newItem.name || !newItem.destination}
                                >
                                    Upload Asset
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Modal */}
            {viewingAsset && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-background rounded-2xl shadow-2xl w-full max-w-4xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div>
                                <h2 className="text-xl font-bold">{viewingAsset.name}</h2>
                                <p className="text-sm text-muted-foreground">{viewingAsset.destination} • {viewingAsset.type}</p>
                            </div>
                            <button
                                onClick={() => setViewingAsset(null)}
                                className="p-2 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 bg-muted/30 p-8 flex items-center justify-center overflow-auto">
                            {viewingAsset.previewUrl ? (
                                viewingAsset.format === "MP4" ? (
                                    <video
                                        src={viewingAsset.previewUrl}
                                        controls
                                        className="max-w-full max-h-[60vh] rounded-lg shadow-lg"
                                    />
                                ) : (
                                    <img
                                        src={viewingAsset.previewUrl}
                                        alt={viewingAsset.name}
                                        className="max-w-full max-h-[60vh] rounded-lg shadow-lg object-contain"
                                    />
                                )
                            ) : (
                                <div className="flex flex-col items-center justify-center text-muted-foreground p-12">
                                    <Box className="w-24 h-24 mb-4 opacity-20" />
                                    <p className="text-lg font-medium">Preview not available</p>
                                    <p className="text-sm">This asset type cannot be previewed directly.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-border flex justify-end gap-3 bg-background">
                            <Button variant="outline" onClick={() => setViewingAsset(null)}>
                                Close
                            </Button>
                            <Button className="gap-2">
                                <Download className="w-4 h-4" />
                                Download Asset
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
