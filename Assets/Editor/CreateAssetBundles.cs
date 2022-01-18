using UnityEditor;
using UnityEngine;
using System.IO;

namespace ABG
{
    public class CreateAssetBundles
    {
        [MenuItem("Assets/Build AssetBundles")]
        static void BuildAllAssetBundles()
        {
            Object[] objectsToConvert = Resources.LoadAll("Conversion");
            Debug.Log(objectsToConvert);
            foreach (Object objectToConvert in objectsToConvert)
            {
                string assetPath = AssetDatabase.GetAssetPath(objectToConvert);
                string objectName = Path.GetFileNameWithoutExtension(assetPath);
                AssetImporter.GetAtPath(assetPath).SetAssetBundleNameAndVariant(objectName, "");
            }

            string assetBundleDirectory = Path.Combine("Assets/Resources/Converted");
            if (!Directory.Exists(assetBundleDirectory))
            {
                Directory.CreateDirectory(assetBundleDirectory);
            }
            BuildPipeline.BuildAssetBundles(assetBundleDirectory,
                                            BuildAssetBundleOptions.None,
                                            BuildTarget.StandaloneWindows64);

            AssetDatabase.Refresh();
        }
    }
}