using UnityEditor;
using UnityEngine;
using System.IO;

public class CreateAssetBundles
{
    [MenuItem("Assets/Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        Object[] objectsToConvert = Resources.LoadAll("Conversion");

        foreach(Object o in objectsToConvert)
        {
            string assetPath = AssetDatabase.GetAssetPath(o);
            AssetImporter.GetAtPath(assetPath).SetAssetBundleNameAndVariant(o.name, "");
        }

        string assetBundleDirectory = ("Assets/Resources/Converted");
        if (!Directory.Exists(assetBundleDirectory))
        {
            Directory.CreateDirectory(assetBundleDirectory);
        }
        BuildPipeline.BuildAssetBundles(assetBundleDirectory,
                                        BuildAssetBundleOptions.None,
                                        BuildTarget.StandaloneWindows);

        AssetDatabase.Refresh();
    }
}