using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]
public class BatchScript : MonoBehaviour
{
    public void Start()
    {
        StartCoroutine(Example_AsyncTests());
    }

    public IEnumerator Example_AsyncTests()
    {
        yield return null;
        Debug.Log("Hallo");
    }
}
