using UnityEditor;
using UnityEngine;
using System.IO;

public class CreateAssetBundles
{
    [MenuItem("Assets/Build AssetBundles")]
    static void BuildAllAssetBundles()
    {
        Object[] objectsToConvert = Resources.LoadAll("Conversion");
        Debug.Log(objectsToConvert);
        foreach(Object objectToConvert in objectsToConvert)
        {
            string assetPath = AssetDatabase.GetAssetPath(objectToConvert);
            AssetImporter.GetAtPath(assetPath).SetAssetBundleNameAndVariant(objectToConvert.name, "");
        }

        string assetBundleDirectory = Path.Combine("Assets/Resources/Converted");
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